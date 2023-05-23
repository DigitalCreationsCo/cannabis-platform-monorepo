import cluster from "node:cluster";
import settings from "../../settings";
const 
workers = [];

class ClusterInit {
  constructor() {
    
    cluster.setupPrimary({
      
      exec: 'src/cluster/worker/index.mjs',
    });

    for (var i = 0; i < settings.numCPUs; i++) {
      workers[i] = cluster.fork();

      workers[i].on("message", function (_msg) {
        switch (_msg.act) {
          case "":
            break;
        }
      });
    }
  }

  static SendToWorker(_workerId, _command, _data) {
    workers[_workerId].send({ act: _command, data: _data });
  }
}

export default ClusterInit
