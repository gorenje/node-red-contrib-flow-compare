module.exports = function (RED) {
  function FlowCompareFunctionality(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    var cfg = config;

    node.on('close', function () {
      node.status({});
    });

    /* msg handler, in this case pass the message on unchanged */
    node.on("input", function (msg, send, done) {
      send(msg);
      done();
    });
  }

  RED.nodes.registerType("FlowCompareCfg", FlowCompareFunctionality);

  function compareFlows(msg) {
    var oldFlowRevision = {};
    var newFlowRevision = {};

    for (var idx = 0; idx < msg.payload.length; idx++) {
      oldFlowRevision[msg.payload[idx].id] = msg.payload[idx]
    }

    for (var idx = 0; idx < msg.new_flowdata.length; idx++) {
      newFlowRevision[msg.new_flowdata[idx].id] = msg.new_flowdata[idx]
    }

    var changes = []

    /* nodes that have been deleted */
    for (var idx = 0; idx < msg.payload.length; idx++) {
      var oldObj = msg.payload[idx];

      if (!newFlowRevision[oldObj.id]) {
        changes.push({
          type: "deleted",
          id: oldObj.id,
          oldObj: oldObj,
          newObj: undefined
        })
      }
    }

    for (var idx = 0; idx < msg.new_flowdata.length; idx++) {
      var newObj = msg.new_flowdata[idx];
      var oldObj = oldFlowRevision[newObj.id];

      if (!oldObj) {
        changes.push({
          type: "added",
          id: newObj.id,
          oldObj: undefined,
          newObj: newObj
        })
      } else {
        if (JSON.stringify(oldObj) != JSON.stringify(newObj)) {
          changes.push({
            type: "changed",
            id: newObj.id,
            oldObj: oldObj,
            newObj: newObj
          })
        }
      }
    }

    return changes;
  }

  RED.httpAdmin.get('/FlowCompare/jslib/:libraryname', function (req, res) {
    const path = require('path');
    const fs = require('fs')
    let redirectLocation = {}
    let filename = undefined

    try {
      switch (req.params.libraryname) {
        case "diff.min.js":
          redirectLocation = { Location: 'https://cdn.openmindmap.org/thirdparty/diff.min.js' }
          filename = path.resolve(path.dirname(__filename), "..", "vendor", "diff.min.js")

          if (fs.existsSync(filename)) {
            return res.sendFile(filename)
          }
          break
          
        case "flowviewer.min.js":
          redirectLocation = { Location: 'https://cdn.openmindmap.org/embed/flowviewer.js' }
          filename = path.resolve(path.dirname(__filename), "..", "vendor", "flowviewer.min.js")

          if (fs.existsSync(filename)) {
            return res.sendFile(filename)
          }
          break
      }
    } catch (ex) { }

    res.writeHead(302, redirectLocation)
    return res.end();
  });

  RED.httpAdmin.post("/FlowCompareCfg",
    RED.auth.needsPermission("FlowCompareCfg.write"),
    (req, res) => {
        try {
          if (req.body ) {
            var nodes = [];
            RED.nodes.eachNode(nde => {
              if (nde.z == req.body.flowid || nde.id == req.body.flowid) nodes.push(nde)
            })

            res.status(200).send({
              "status":  "ok",
              "flowid":  req.body.flowid,
              "nodes":   nodes,
              "changes": compareFlows({payload: nodes, new_flowdata: req.body.flowdata})
            })
          } else {
            res.sendStatus(404);
          }
        } catch (err) {
          console.error(err);
          res.status(500).send(err.toString());
        }
    });
}
