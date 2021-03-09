<template>
  <div class="container">
    <div class="sider">
      <draggable
        :list="list1"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list1"
          :key="element.name"
        >
          {{ element.describe }}
        </div>
      </draggable>
    </div>
    <div class="main">
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list2"
          :key="element.name"
        >
          <div v-if="element.name === 'q'">
            <div><input type="text" /></div>
          </div>
          <div v-else-if="element.name === 'w'">
            <div>
              <select>
                <option value="1">test</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div v-else-if="element.name === 'e'">
            <div><textarea /></div>
          </div>
          <div v-else-if="element.name === 'f'">
            <div><button>测试</button></div>
          </div>
        </div>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { describe: "输入框", name: "q" },
        { describe: "下拉框", name: "w" },
        { describe: "多行文本输入框", name: "e" },
        { describe: "按钮", name: "f" },
      ],
      list2: [{ describe: "输入框", name: "q" }],
    };
  },
  methods: {
    show() {},
    log: function (evt) {
      window.console.log(evt);
    },
  },
};
</script>
<style  scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
}
.sider {
  width: 230px;
  border: 1px solid red;
}
.main {
  padding: 10px;
  flex: 1;
}
.dragArea {
  height: 100%;
  border: 1px solid blue;
}
.list-group-item {
  padding: 20px;
}
</style>