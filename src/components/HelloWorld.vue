<template>
  <div class="container">
    <div class="sider">
      <p class="group-title">
        基础组件
        <button @click="save">保存</button>
      </p>
      <draggable
        class="draggableContainer"
        :list="componentList"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <li
          class="component-group-item"
          v-for="element in componentList"
          :key="element.name"
        >
          <span>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${element.iconName}`" />
            </svg>
          </span>
          {{ element.describe }}
        </li>
      </draggable>
    </div>

    <div class="main">
      <draggable
        class="dragArea list-group"
        :list="formFactory"
        group="people"
        @change="log"
      >
        <div
          @click="handelClick(element, index)"
          class="form-group-item"
          v-for="(element, index) in formFactory"
          :key="index"
        >
          <span>{{ element.title }}：</span>
          <div class="item-wrapper">
            <div v-if="element.name === 'input'">
              <input class="cp-input" type="text" readonly />
            </div>
            <div v-else-if="element.name === 'dropdown'">
              <select>
                <option value="1">test</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div v-else-if="element.name === 'textaera'">
              <textarea readonly class="cp-textaera" />
            </div>
          </div>
          <div v-if="index === currentTag.added.newIndex" class="actions">
            <div>
              <svg class="icon" aria-hidden="true" @click="handelDelete">
                <use xlink:href="#icon-delete"></use>
              </svg>
            </div>
          </div>
        </div>
      </draggable>
    </div>

    <div class="options">
      <p class="group-title">字段属性</p>
      <div v-if="currentTag.added.newIndex !== null">
        <div>
          <span>标题：</span>
          <input @input="kk" :value="currentTag.added.element.title" />
        </div>
        <div>
          {{ currentTag }}
        </div>
      </div>
      <template v-else>
        <div class="option-item">暂未选择节点</div>
      </template>
    </div>
    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />
    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
const originComponentList = () => [
  {
    id: Math.random() * 10000,
    describe: "输入框",
    name: "input",
    iconName: "input",
    title: "输入框",
  },
  {
    id: Math.random() * 10000,

    describe: "下拉框",
    name: "dropdown",
    iconName: "riqi",
    title: "下拉框",
  },
  {
    id: Math.random() * 10000,

    describe: "多行文本",
    name: "textaera",
    iconName: "textarea",
    title: "多行文本",
  },
];
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
  },
  data() {
    return {
      componentList: originComponentList(),
      formFactory: [],
      currentTag: {
        added: {
          element: {},
          newIndex: null,
        },
      },
    };
  },
  created() {
    if (window.localStorage.getItem("a")) {
      const b = JSON.parse(window.localStorage.getItem("a"));
      this.formFactory = b;
    }
    console.log(1111111);
  },
  methods: {
    kk(e) {
      console.log(this.formFactory);
      this.formFactory.forEach((element) => {
        if (element.id === this.currentTag.added.element.id) {
          element.title = e.target.value;
          this.currentTag.added.element.title = e.target.value;
        }
      });
    },
    show() {},
    log: function (e) {
      this.componentList = originComponentList(); // (this.currentTag = JSON.parse(JSON.stringify(e)));
      this.currentTag = JSON.parse(JSON.stringify(e));
      console.log(this.currentTag);
    },
    save() {
      if (this.formFactory.length === 0) {
        alert("表单项不能为空");
        return;
      }
      window.localStorage.setItem("a", JSON.stringify(this.formFactory));
      console.log(this.formFactory);
    },
    handelClick(ele, index) {
      this.currentTag = {
        added: {
          element: ele,
          newIndex: index,
        },
      };
    },
    checkSelected(data, e) {
      console.log(data, e);
    },
    handelDelete() {
      this.formFactory.splice(this.currentTag.newIndex, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  .group-title {
    font-size: 20px;
  }
  .draggableContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .component-group-item {
      width: 40%;
      display: flex;
      background: #f4f6fc;
      margin-bottom: 12px;
      padding: 8px 10px;
      &:hover {
        cursor: grab;
      }
      span {
        margin-right: 0.5em;
      }
      &.active {
        border: 1px solid red;
      }
    }
  }
  .item-wrapper {
    flex: 1;
  }
}

.main {
  background: #fafafa;
  flex: 1;
  border-top: 1px solid #ddd;
  padding: 20px;
  display: flex;
  .dragArea {
    background: #fff;
    overflow: auto;
    flex: 1;
    padding: 16px;
    border: 1px dashed #aaa;
    .form-group-item {
      align-items: center;
      padding: 0 16px;
      position: relative;
      display: flex;
      min-height: 48px;
      border: 1px solid #ccc;
      &:not(:first-child) {
        margin-top: 12px;
      }
      &:hover {
        background: #ecf5ff;
        cursor: pointer;
      }
      .actions {
        border: 4px solid #409eff;
        height: 100%;
        width: 100%;
        position: absolute;
        left: -3px;
        top: -3px;
        &::before {
          content: ""; /*:before和:after必带技能，重要性为满5颗星*/
          display: block;
          position: absolute; /*日常绝对定位*/
          width: 0;
          height: 0;
          border: 6px solid #409eff;
          left: 0;
          top: 0px;
        }
        > div {
          display: inline-flex;
          position: absolute;
          right: 0;
          bottom: 0;
          svg {
            background: #409eff;
            color: white;
            height: 16px;
            width: 16px;
            padding: 2px;
          }
        }
      }
      span {
        width: 120px;
        text-align: right;
      }
    }
  }
  .cp-input {
    height: 32px;
    line-height: 32px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    &:hover {
      cursor: pointer;
    }
  }

  .cp-textaera {
    margin-top: 5px;
    height: 48px;
    line-height: 32px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:hover {
      cursor: pointer;
    }
  }
}

.sider {
  padding: 0 8px 8px 8px;
  width: 250px;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
}

.options {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  width: 250px;
  padding: 0 8px 8px 8px;
  .option-item {
    border-bottom: 1px #ccc solid;
  }
}
</style>