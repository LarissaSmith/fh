
export const EntryFieldTemplate =
`<div class="entry-field"
      @click="focus()"
      :class="{'focus': $store.state.focus.currentField==fieldIndex}">
    <label>{{displayName}} {{properties.entryRequired ? '*' : ''}}</label>
    <div class="entry-field__input-wrapper">
        <div class="entry-field__typeahead">
            <span>{{fieldobj.content == '' ? storeBlankUnreadable == BLANK || storeBlankUnreadable == UNREADABLE ? blankUnreadable(storeBlankUnreadable) : 'Enter Text Here' : dropdown.typeahead[0]}}</span>
            {{dropdown.typeahead[1]}}
        </div>
        <div class="entry-field__input" contenteditable="true" ref="input"></div>
        <div class="entry-field__overlay" v-show="!inputHasFocus && fieldobj.content">{{blankUnreadable(fieldobj.content)}}</div>
    </div>
    
    <!--dropdown things-->
    <button class="btn entry-field__dropdown-btn"
        @click="toggleDropdown()"
        v-show="!dropdown.active && showDropdown">
        <span class="caret"></span>
    </button>
    <div class="entry-field__dropdown" v-show="dropdown.active">
        <ul>
            <li :class="{selected: dropdown.activeIndex==index}"
                v-for="(item, index) in dropdown.list"
                @mousedown="selectDropdownItem(item)"
                @mouseover="setActiveDropdownItem(index)">
                {{item.label}}
            </li>
            <li v-show="!dropdown.list.length">No Results</li>
        </ul>
    </div>
</div>`;