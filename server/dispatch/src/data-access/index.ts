import cluster from "cluster";
// import _ from '../util'
// const { db_uri, db_ns } = process.env;
import prisma, { Coordinates } from '@cd/data-access';
import { ChangeStream, Collection, MongoClient, ObjectId } from "mongodb";
import _ from '../util';

const 
mongoConnectUrl = process.env.MONGODB_SERVER_DISPATCH_CLUSTER_URL || ''


class DispatchDA {

  driverSessionsCollection: Collection | undefined;
  dispatchOrdersCollection: Collection | undefined;
  dispatchOrdersChangeStream: ChangeStream | undefined;

  constructor() {
    this.driverSessionsCollection;
    this.dispatchOrdersCollection;
    this.dispatchOrdersChangeStream;

    if (cluster.isPrimary) {
      return (async () => {

        await this.connectDb()
        await this.createPendingOrdersChangeStream()
        .then(() => console.log(" 🚔 [Primary:" + process.pid + "] is connected to Mongo, and Prismadatabase. 👏"));

        return this;

      })() as unknown as DispatchDA;
    }

    if (cluster.isWorker) {
      return (async () => {
        
        await this.connectDb()
        .then(() => console.log(" 🚔 [Worker-" + cluster?.worker?.id + ":" + process.pid + "] is connected to Mongo, and Prismadatabase. 👏"));
        
        return this;
        
      })() as unknown as DispatchDA;
    }
  }

  async connectDb() {
    const 
    dispatch_namespace = process.env.DISPATCH_DB_NS;

    await 
    MongoClient.connect(mongoConnectUrl)
    .then(async (client) => {
      this.driverSessionsCollection = client.db(dispatch_namespace).collection('driverSessions');
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
    
    return this;
  }

  async getDispatchOrderById(id: string) {
    // need from mongo or prisma?
    // how to make it distinct in code and design?
    try {
      
      const
      order = await this.dispatchOrdersCollection?.findOne({ id: new ObjectId(id) });

      return order;

    } catch (error) {
      console.error(`Error occurred while retrieving order, ${error}`);
    }
  }

  async getDriverUserRecordById(driverId: string) {
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
      // return await this.driversCollection?.findOne(query, projection);
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`);
    }
  }

  async findDriversWithinRange(coordinates: Coordinates) {
    // query mongo db
    // search within ~5 miles, increase the range if no drivers are found
    try {
      let
      geoJsonPoint = _.getGeoJsonPoint(coordinates)

      if (!geoJsonPoint) 
      throw new Error("No coordinates are valid.");
      
      return await this.driverSessionsCollection?.aggregate([
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

  async findDriverIdsWithinRange(coordinates: Coordinates) {
    // search within ~5 miles, increase the range if no drivers are found
    try {
      let
      geoJsonPoint = _.getGeoJsonPoint(coordinates)

      if (!geoJsonPoint) 
      throw new Error("No coordinates are valid.");

      const
      driverIds = await this.driverSessionsCollection?.aggregate([
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

      return driverIds as unknown as { driverId: string }[] || [];
        
    } catch (error: any) {
      console.error('Dispatch: findDriverIdsWithinRange error: ', error);
      throw new Error(error.message);
    }
  }

  async addDriverToOrderRecord(orderId: string, driverId: string) {
    // query prisma to add to order,
    // and to mongo as well for the change stream
    try {
      
      let 
      query = { orderId: new ObjectId(orderId) };
      
      let 
      driver = await this.getDriverUserRecordById(driverId);
      
      let 
      update = { $set: { driver: driver } };
      
      const 
      updatedOrder = await this.dispatchOrdersCollection?.updateOne(
        query,
        update,
        { writeConcern: { w: "majority" }}
      );

      if (updatedOrder?.modifiedCount === 0)
      throw new Error(`Did not update the record: ${orderId}`);

      return { success: true };
    } catch (error: any) {
      console.error(`Error occurred while updating order, ${error}`);
      throw new Error(error.message);
    }
  }

  async createPendingOrdersChangeStream() {
    try {

      const 
      changeStream = await this.dispatchOrdersCollection?.watch([], { fullDocument: "updateLookup" });

      console.log(` 🚔 [Primary: ${process.pid}] is watching ${this.dispatchOrdersCollection?.namespace} collection for dispatch orders`);

      this.dispatchOrdersChangeStream = changeStream;
      
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default new DispatchDA();