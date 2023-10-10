# FlowCompare

FlowCompare node is a node for visually comparing the editor flows with flows deployed to the server.

Flows are deployed from the editor to the server, hence they can differ. This node highlights changes that have occurred in the editor.

## Why?

I wanted to have a *visual* comparison between versions of flows. Also I wanted changes to be classified as being either visual or textual: visual changes movements of nodes, textual are content changes.

## Description

When placed in the workspace and having been deployed, open the property panel shows the following:

![img](https://cdn.openmindmap.org/content/1696944958539_flowcompare.gif)

Clicking the compare button generates the comparison details.

## Iconography

The top box contains all changes that have happened:

![img](https://cdn.openmindmap.org/content/1696947093993_Screen_Shot_2023-10-10_at_16.01.50.png)

- `pencil` are nodes that have content changes in addition - potentially - to visual changes
- `eye` are nodes that have *only* visual changes
- `ticks` are nodes that have been added
- `cross` are nodes that have been deleted.

## Colourisation

In the image, nodes are colorised:

- grey/black are deleted nodes
- green are added nodes
- green with blue border are moved nodes, nodes that have only changed visually
- purple nodes have textual, i.e., content changes

![img](https://cdn.openmindmap.org/content/1696946893210_Screen_Shot_2023-10-10_at_16.02.13.png)

The slider to the left is the server version, to the right its the local version of the flow.

In the textual diff box:

![img](https://cdn.openmindmap.org/content/1696946912538_Screen_Shot_2023-10-10_at_16.02.04.png)

Red are deletions and green are additions, i.e., changes.

## Not Perfect

This is not a perfect solution because the node has to be dragged onto the workspace *and* deployed. It needs to be deployed since the server-side part of this node collects the flows details from the server and sends it to the frontend.

So this node needs to be included and deployed *before* comparison can happen. This is not ideal, better would be that this feature be integrated directly into the editor. The editor does also have a comparison tool but its not visual and shows, for my taste, too much information.

### Artifacts

- [GitHub repo](https://github.com/gorenje/node-red-contrib-flow-compare)
- [Flow maintaning code](https://flowhub.org/f/bd2901f55cfc55ef)
- [NPMjs node package]()
- [Node-RED package]()

### Guarantee

There is none, use at own risk.
