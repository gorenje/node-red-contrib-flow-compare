# FlowCompare

FlowCompare node is a node for visually comparing the editor flows with flows deployed to the server.

Flows are deployed from the editor to the server, hence they can differ. This node highlights changes that have occurred in the editor.

## Why?

I wanted to have a *visual* comparison between versions of flows. Also I wanted changes to be classified as being either visual or textual: visual changes movements of nodes, textual are content changes. Node-RED does have a diff tool however, for me, this shows too much (all nodes are shown even those that haven't changed) and changes that are visual are shown textually. 

## Description

Once installed, node can be accessed via the menu:

![img](https://cdn.openmindmap.org/content/1697530336854_Screen_Shot_2023-10-17_at_10.12.07.png)

The panel is split into a list of changes, an image visually showing changes and a detailed change panel at the bottom:

![img](https://cdn.openmindmap.org/content/1696944958539_flowcompare.gif)

Clicking the compare button generates the comparison details.

**Update**: A double click in the listing of changes will now open the edit panel for that node. That is not shown in the above animation.

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
- nodes are highlighted with red-border when change is selected in the change box

![img](https://cdn.openmindmap.org/content/1696946893210_Screen_Shot_2023-10-10_at_16.02.13.png)

The slider to the left is the server version, to the right its the local version of the flow.

In the textual diff box:

![img](https://cdn.openmindmap.org/content/1696946912538_Screen_Shot_2023-10-10_at_16.02.04.png)

Red are deletions and green are additions, i.e., changes.

## Not Perfect

1) Image Zoom

Zoom of comparison image is not perfect since pinch does not work, only the scroll works for zoom. Since scroll is also used to scroll up and down, scroll left and right to zoom image in and out.

2) Extra JS scripts

This node will load two JS libraries (when added [to the palette](https://github.com/gorenje/node-red-contrib-flow-compare/blob/4981b85bf29cf5726609d39a0f6e21e8456d72f5/nodes/flowcompare.html#L478-L479)):

- https://cdn.openmindmap.org/thirdparty/diff.min.js
- https://cdn.openmindmap.org/embed/flowviewer.js

### Artifacts

- [GitHub repo](https://github.com/gorenje/node-red-contrib-flow-compare)
- [Flow maintaning code](https://flowhub.org/f/bd2901f55cfc55ef)
- [NPMjs node package](https://www.npmjs.com/package/@gregoriusrippenstein/node-red-contrib-flowcompare)
- [Node-RED package](https://flows.nodered.org/node/@gregoriusrippenstein/node-red-contrib-flowcompare)

- [Frontend Flow](https://flowhub.org/f/7750f7bbea836e0e) to trigger a comparison update on flow tab change.


