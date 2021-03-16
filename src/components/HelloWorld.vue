<template>
  <div class="container">
    <div class="sider">
      <p class="group-title">
        基础组件
        <button class="biz-btn" @click="save">保存</button>
      </p>
      <draggable
        class="draggableContainer"
        :list="componentList"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
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
        @change="factoryChange"
        :list="formFactory"
        group="people"
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
              <input
                :placeholder="element.placeholder"
                class="cp-input"
                type="text"
                readonly
              />
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
            <div v-else-if="element.name === 'radio'">
              <label v-for="ele in element.data">
                <input disabled type="radio" :name="element.mark" :value="ele.value" />
                {{ ele.name }}</label
              >
            </div>
          </div>
          <div v-if="index === currentTag.added.newIndex" class="actions">
            <div>
              <svg class="icon" aria-hidden="true" @click="handelDelete(index)">
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
        <div class="option-item">
          <p>字段标识：</p>
          <input
            class="cp-input"
            @input="changeOption($event, 'mark')"
            :value="currentTag.added.element.mark"
          />
        </div>
        <div class="option-item">
          <p>标题：</p>
          <input
            class="cp-input"
            @input="changeOption($event, 'title')"
            :value="currentTag.added.element.title"
          />
        </div>
        <div class="option-item" v-if="!currentTag.added.element.data">
          <p>占位符：</p>
          <input
            class="cp-input"
            @input="changeOption($event, 'placeholder')"
            :value="currentTag.added.element.placeholder"
          />
        </div>
        <div class="option-item" v-if="!currentTag.added.element.data">
          <p>操作属性：</p>
          <label>
            <input
              @input="disabledChange"
              :checked="currentTag.added.element.disabled"
              type="checkbox"
            />
            禁用
          </label>
        </div>

        <div class="option-item" v-if="currentTag.added.element.data">
          <p>
            单选数据
            <button class="biz-btn" @click="addRadioItem">添加数据项</button>
          </p>
          <div class="cp-radio">
            <label v-for="(element, index) in currentTag.added.element.data">
              <input
                type="radio"
                :name="currentTag.added.element.mark"
                :value="element.value"
              />
              <input class="cp-input" v-model="element.value" />
              <input class="cp-input" v-model="element.name" />
              <button class="biz-btn-danger" @click="remoteRadioItem(index)">
                X
              </button>
            </label>
          </div>
        </div>
        <div class="option-item">
          <p>校验：</p>
          <label>
            <input
              @input="changeOption($event, 'required')"
              :checked="currentTag.added.element.required"
              type="checkbox"
            />
            必填
          </label>
        </div>
        <div>
          {{ currentTag }}
        </div>
      </div>
      <template v-else>
        <div class="option-nodata">暂未选择节点</div>
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
    id: `input_${Math.random() * 10000}`,
    describe: "输入框",
    name: "input",
    iconName: "input",
    title: "输入框",
    mark: "",
    placeholder: "",
    disabled: false,
    hasPh: true,
    required: false,
  },
  {
    id: `select${Math.random() * 10000}`,
    describe: "下拉框",
    name: "dropdown",
    iconName: "drop_down",
    title: "下拉框",
    mark: "",
    hasPh: true,
    placeholder: "",
    disabled: false,
    required: false,
  },
  {
    id: `radio${Math.random() * 10000}`,
    describe: "单选框",
    name: "radio",
    iconName: "danxuanti",
    title: "单选",
    mark: "default",
    placeholder: "",
    disabled: false,
    required: false,
    data: [
      { name: "北京", value: 1, checked: false },
      { name: "上海", value: 2, checked: false },
      { name: "广州", value: 3, checked: false },
    ],
  },
  {
    id: `checkbox${Math.random() * 10000}`,
    describe: "多选框",
    name: "checkbox",
    iconName: "check-box-outline",
    title: "多选框",
    mark: "default",
    placeholder: "",
    disabled: false,
    required: false,
  },
  {
    id: `textaera${Math.random() * 10000}`,
    describe: "多行文本",
    name: "textaera",
    iconName: "textarea",
    hasPh: true,
    title: "多行文本",
    mark: "",
    placeholder: "",
    disabled: false,
    required: false,
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
      console.log(this.formFactory);
      this.currentTag = {
        added: {
          element: b[0],
          newIndex: 0,
        },
      };
    }
  },
  methods: {
    factoryChange(e) {
      console.log('我执行了')
      // this.componentList = originComponentList(); // (this.currentTag = JSON.parse(JSON.stringify(e)));
      if (e.moved) {
        const temp = { added: { ...e.moved } };
        this.currentTag = JSON.parse(JSON.stringify(temp));
      } else {
        this.currentTag = JSON.parse(JSON.stringify(e));
      }
    },
    changeOption(e, str) {
      const data = "checked" in e.target ? e.target.checked : e.target.value;
      console.log(data);
      this.formFactory.forEach((element) => {
        if (element.id === this.currentTag.added.element.id) {
          element[str] = data;
          this.currentTag.added.element[str] = data;
        }
      });
    },

    markChange(e) {
      this.formFactory.forEach((element) => {
        if (element.id === this.currentTag.added.element.id) {
          element.mark = e.target.value;
          this.currentTag.added.element.mark = e.target.value;
        }
      });
    },
    requiredChange(e) {
      this.formFactory.forEach((element) => {
        if (element.id === this.currentTag.added.element.id) {
          element.required = e.target.value;
          this.currentTag.added.element.required = e.target.value;
        }
      });
    },

    disabledChange(e) {
      this.formFactory.forEach((element) => {
        if (element.id === this.currentTag.added.element.id) {
          console.dir(e.target.checked);
          element.disabled = e.target.checked;
          this.currentTag.added.element.disabled = e.target.checked;
        }
      });
    },

    remoteRadioItem(index) {
      if (this.currentTag.added.element.data.length <= 1) {
        alert("最少保留一项");
        return;
      }
      this.currentTag.added.element.data.splice(index, 1);
    },
    addRadioItem() {
      const data = this.currentTag.added.element.data;
      data.push({ name: "未设名称", value: "未设值", checked: false });
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
    handelDelete(index) {
      // if (this.formFactory.length >= 1) this.currentTag = this.formFactory[0];
      this.formFactory.splice(index, 1);
      // if (this.formFactory.length >= 1) {
      //   // this.currentTag = {
      //   //   added: {
      //   //     element: {},
      //   //     newIndex: null,
      //   //   },
      //   // };
      //   this.currentTag = {};
      // }
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
    input {
      vertical-align: middle;
      margin-top: -1px;
      margin-bottom: 1px;
    }
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
    label {
      display: flex;
      align-items: center;
    }
    p {
      margin: 4px;
    }
    border-bottom: 1px #ccc solid;
    padding-bottom: 10px;
  }
}

.biz-btn {
  outline: none;
  border: none;
  padding: 6px 10px;
  background: #1890ff;
  color: white;
  border-radius: 4px;
  &:hover {
    background: #40a9ff;
    cursor: pointer;
  }
  &-danger {
    outline: none;
    border: none;
    padding: 6px 10px;
    color: white;
    border-radius: 4px;
    background: #ff4d4f;
    &:hover {
      background: #ff7875;
      cursor: pointer;
    }
  }
}

.cp-input {
  height: 32px;
  line-height: 32px;
  width: 80%;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  &::placeholder {
    color: #c0c4cc;
  }
}

.cp-textaera {
  margin-top: 5px;
  height: 48px;
  line-height: 32px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.cp-radio {
  label {
    vertical-align: text-bottom;
    display: inline-flex;
    align-items: center;
    input {
      margin: 0 8px;
      vertical-align: middle;
      margin-top: -1px;
      margin-bottom: 1px;
      &:not(:first-child) {
        margin-top: 2px;
      }
    }
  }
}
</style>