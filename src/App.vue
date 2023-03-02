<template>
  <h1>Dynamic Nav Builder</h1>
  <br>
  <Tree
    ref="Tree"
    :nodes="nodes"
    :config="config"
    class="tree-text"
    @node-opened="log(`node-opened`)"
    @node-closed="log('node-closed')"
    @node-focus="log('node-focus')"
    @node-toggle="log('node-toggle')"
    @node-blur="log('node-blur')"
    @node-edit="log('node-edit')"

    @node-checked="log('node-checked')"
    @node-unchecked="log('node-unchecked')"

    @node-dragstart="log('node-dragstart')"
    @node-dragenter="log('node-dragenter')"
    @node-dragleave="log('node-dragleave')"
    @node-dragend="log('node-dragend')"
    @node-over="log('node-over')"
    @node-drop="log('node-drop')"
  >
  </Tree>

</template>

<script lang="ts">
import Tree from "./components/Tree.vue";
import { INode } from "./structure/INode";
import { checkMode } from './structure/IConfiguration';
import { INodeState } from './structure/INodeState';
import { tree_data }  from './navData';

export default {
  components: {
    Tree,
  },
  data: function() {
    return {
      config: {
        roots: ["id1", "id2", "id3", "id4", "id5"],
        // leaves: ["id10000"],
        checkboxes: false,
        dragAndDrop: false,
        checkMode: checkMode.manual,
        keyboardNavigation: false,
      },
      nodes: {},
      modeBool: false,
      code: "",
      nbRoots: 0,
      maxDepth: 0,
      maxChild: 0,
      nbNodes: 0,
      extItems:  [
          { id: 0, title: 'Item A' },
          { id: 1, title: 'Item B' },
          { id: 2, title: 'Item C' }
      ],
      navData: tree_data
    };
  },
  mounted() {
    this.nodes = this.navData;
    this.code = JSON.stringify(this.nodes, undefined, 4);
  },
  methods: {
    log(s: string): void {
      console.log(s);
    },
    startDragExt (evt, item) {
        evt.dataTransfer!.setData('application/json', JSON.stringify(item));
        // evt.dataTransfer!.setData('text/plain', "some content");
    },
    serverLoading(node: INode): void {
      if (node.children == null || node.children.length === 0) {
        node.state.isLoading = true;
        setTimeout(() => {
          for (let i = 0; i < Math.round(Math.random() * 4); i++) {
            const id = `${Date.now()}`;
            const n: INode = {
              text: `loaded from server`,
              children: [],
              state: {}
            };

            this.nodes[id] = n;
            node.children = [];
            node.children.push(id);
          }
          node.state.isLoading = false;
        }, 3000);
      }
    },
    changeMode(): void {
      this.modeBool = !this.modeBool;
      this.config.checkMode = this.modeBool ? checkMode.auto : checkMode.manual;
    },
    randomTree(): void {
      this.config.roots = [];
      this.nodes = {};
      this.nbNodes = 0;

      for (let i = 0; i < this.nbRoots; i++) {
        let maxDepth = this.maxDepth;
        const n = this.createNode(i + 1, maxDepth);
        this.config.roots.push(n);
      }

      console.log(`node created: ${this.nbNodes}`);
      console.log(this.nodes);
    },
    addNodes(parent: INode, lvl: number, depth: number): void {
      for (let i = 0; i < this.maxChild; i++) {
        if (!this.randBool(0.8)) {
          break;
        }

        const n = this.createNode(Number(`${lvl}${i + 1}`), depth);
        parent.children.push(n);
      }
    },
    createNode(lvl: number, depth: number): string {
      const id = `id${ lvl }`;
      const n: INode = {
        text: `text${id}`,
        children: [],
        state: this.randomState()
      };

      this.nodes[id] = n;
      this.nbNodes++;

      if (depth > 0 && this.randBool(0.8)) {
        this.addNodes(n, lvl, depth - 1);
      }

      return id;
    },
    randomState(): INodeState {
      return {
        opened: this.randBool(),
        disabled: this.randBool(),
        editable: this.randBool(),
        draggable: this.randBool(),
        dropable: this.randBool(),
        checked: this.randBool(),
        indeterminate: this.randBool(0.3)
      };
    },
    randBool(mod: number = 0.5): boolean {
      return Math.random() < mod;
    }
  }
};
</script>
<style scoped>
h1 {
  color: black;
  padding: 0;
  margin-top: -100px;
}
.tree-text {
  margin-top: -50px;
}
</style>