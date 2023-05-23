import cluster from "cluster";
// import _ from '../util'
// const { db_uri, db_ns } = process.env;
import prisma from '@cd/data-access';
import { MongoClient, ObjectId } from "mongodb";

const 
mongoConnectUrl = process.env.MONGODB_SERVER_DISPATCH_CLUSTER_URL


export default class DispatchDA {

  driverSessionsCollection;
  dispatchOrdersCollection;
  dispatchOrdersChangeStream;

  constructor() {
    this.driverSessionsCollection;
    this.dispatchOrdersCollection;
    this.dispatchOrdersChangeStream;

    if (cluster.isPrimary) {
      (async () => {

        await this.connectDb()
        .then(() => console.log(" 🚔 [Primary:" + process.pid + "] is connected to Mongo, and Prismadatabase. 👏"));

        this.createPendingOrdersChangeStream();
        return this;
      })();
    }

    if (cluster.isWorker) {
      (async () => {
        await this.connectDb()
        .then(() => console.log(" 🚔 [Worker-" + cluster.worker.id + ":" + process.pid + "] is connected to Mongo, and Prismadatabase. 👏"));
        
        return this;
      })();
    }
  }

  async connectDb() {
    const 
    dispatch_namespace = process.env.DISPATCH_DB_NS;

    await 
    MongoClient.connect(mongoConnectUrl)
    .then(async (client) => {
      this.driverSessionsCollection = client.db(dispatch_namespace).collection('dispatch');
      this.dispatchOrdersCollection = client.db(dispatch_namespace).collection('dispatch');
    })
    .catch(error => {
      console.error(" 🚔 server-dispatch : Error connecting to mongo database: ", error.stack);
      process.exit(1);
    });
    
    prisma.$connect()
    .catch(error => {
      console.error(" 🚔 server-dispatch : Error connecting to prisma database: ", error.stack);
      process.exit(1);
    });
  }

  async getDispatchOrderById(orderId) {
    // need from mongo or prisma?
    // how to make it distinct in code and design?
    try {
      return await this.dispatchOrdersCollection.findOne({
        orderId: new ObjectId(orderId),
      });
    } catch (error) {
      console.error(`Error occurred while retrieving order, ${error}`);
    }
  }

  async getDriverById(driverId) {
    // this will query prisma for the user object
    try {
      let query = { driverId: new ObjectId(driverId) };
      let projection = {
        projection: {
          _id: 0,
          email: 0,
          address: 0,
          city: 0,
          state: 0,
          zipcode: 0,
          preferences: 0,
          orderHistory: 0,
        },
      };
      return await this.driversCollection.findOne(query, projection);
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`);
    }
  }

  async findDriversWithinRange(geoJsonPoint) {
    // query mongo db
    // search within ~5 miles, increase the range if no drivers are found
    try {
      // console.log("collection: ", this.driverSessionsCollection);
      return await this.driverSessionsCollection
        .aggregate([
          {
            $geoNear: {
              near: geoJsonPoint,
              query: { isOnline: true, receiveDelivery: true },
              maxDistance: 25000000, // meters
              distanceField: "distanceToFirstStop",
              spherical: true,
            },
          },
          { $limit: 10 },
        ])
        .toArray();
    } catch (error) {
      console.error(error);
    }
  }

  async findDriverIdsWithinRange(geoJsonPoint) {
    // search within ~5 miles, increase the range if no drivers are found
    try {
      // console.log("collection: ", this.driverSessionsCollection);
      return await this.driverSessionsCollection
        .aggregate([
          {
            $geoNear: {
              near: geoJsonPoint,
              query: { isOnline: true, receiveDelivery: true },
              maxDistance: 25000000, // meters
              distanceField: "distanceToFirstStop",
              spherical: true,
            },
          },
          { $limit: 10 },
          { $project: { _id: 0, driverId: 1 } },
        ])
        .toArray();
    } catch (error) {
      console.error(error);
    }
  }

  async addDriverToOrder(orderId, driverId) {
    // query prisma to add to order,
    // and to mongo as well for the change stream
    try {
      let query = { orderId: new ObjectId(orderId) };
      let driver = await this.getDriverById(driverId);
      let update = { $set: { driver: driver } };
      const updatedOrder = await this.dispatchOrdersCollection.updateOne(
        query,
        update,
        {
          w: "majority",
        }
      );
      // console.log("updated " + updatedOrder.modifiedCount + " record");
      if (updatedOrder.modifiedCount === 0) {
        throw new Error(`Did not update the record: ${orderId}`);
      }
      return { success: true };
    } catch (error) {
      console.error(`Error occurred while updating order, ${error}`);
    }
  }

  async createPendingOrdersChangeStream() {
    try {

      const 
      changeStream = await this.dispatchOrdersCollection.watch({
        fullDocument: "updateLookup",
      });

      console.log(' 🚔 [Primary:' + process.pid + '] is watching ' + this.dispatchOrdersCollection.s.namespace.collection + '-collection for dispatch orders');

      this.dispatchOrdersChangeStream = changeStream;
      
    } catch (error) {
      console.error(error);
    }
  }
}
