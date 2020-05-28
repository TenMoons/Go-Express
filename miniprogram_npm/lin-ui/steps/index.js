import validator from "../behaviors/validator";
Component({
  externalClasses: ["l-class"],
  behaviors: [validator],
  options: {
    multipleSlots: !0
  },
  relations: {
    "../step/index": {
      type: "child",
      linked() {
        this._initSteps()
      },
      unlinked() {
        this._initSteps()
      }
    }
  },
  properties: {
    direction: {
      type: String,
      value: "row",
      options: ["row", "column"]
    },
    activeIndex: {
      type: Number,
      value: 0
    },
    color: String,
    stepMinHeight: {
      type: String,
      value: "120"
    },
    status: {
      type: String,
      value: "process",
      options: ["process", "error"]
    },
    dot: Boolean
  },
  observers: {
    activeIndex: function () {
      this._initSteps()
    }
  },
  data: {},
  methods: {
    _initSteps() {
      wx.createSelectorQuery().in(this).select(".steps-container").boundingClientRect().exec(t => {
        let e = this.getRelationNodes("../step/index");
        this.data.length = e.length, this.data.length > 0 && e.forEach((e, i) => {
          e.updateDataChange({
            index: i,
            ...this.data,
            stepsWidth: 380,
          })
        })
      })
    }
  }
});