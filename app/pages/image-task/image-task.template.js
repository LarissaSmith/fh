export default
`<div class="layout">
    <div class="layout-nav">
        <button class="layout-nav__btn">
            <icon name="menu"></icon>        
        </button>
        <div class="layout-nav__title">
            Wedding Record 84736
        </div>
    </div>
    <div class="layout__image">
        <deep-zoom-wrapper></deep-zoom-wrapper>
    </div>
    <div class="layout__control">
        <div class="task"
          v-bind:class="isActive(0)">
            <div class="task-main"
              @click="setActiveTask(0)">
                <span class="task-main__number">1</span>
                <span class="task-main__title">Should this record type be indexed?</span>
                <div class="task-main__toggle">
                    <toggle :disabled="!isActive(0)" v-model="firstToggleOn"></toggle>
                </div>
            </div>
            <div class="task-info">
                <div class="tast-info-inner">
                What to index: <br/>
                Marriage Banns <br/>
                Marriage Licences <br/>
                Marriage Registers <br/>
                </div>
            </div>
        </div>
        <div class="task"
          :class="isActive(1)" :disabled="!isActive(1)">
            <div class="task-main"
              @click="setActiveTask(1)">
                <span class="task-main__number">2</span>
                <span class="task-main__title">Is there extractable data?</span>
                <div class="task-main__toggle">
                    <toggle :disabled="!isActive(1)" v-model="secondToggleOn"></toggle>
                </div>
            </div>
            <div class="task-info">
                <div class="tast-info-inner">
                    Do not index documents that do not show the name of the bride and the groom and at least the event year.
                </div>
            </div>
        </div>
    </div>
</div>`;