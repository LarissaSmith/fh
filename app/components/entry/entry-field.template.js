export const EntryFieldTemplate =
`<div class="entry-field" v-on:click="focus()" :class="{'focus': inputHasFocus}">
    <label>{{displayName}}</label>
    <div class="entry-field__input" contenteditable="true" ref="input"></div>
    <!--<div class="entry-field__error">There is some sort of error here</div>-->
    
    <!--dropdown things-->
    <button class="btn entry-field__dropdown-btn" v-on:click="toggleDropdown()"><span class="caret"></span></button>
    <div class="entry-field__dropdown" v-show="dropdown.active">
        <ul>
            <li :class="{selected: index==0}"
                v-for="(item, index) in dropdown.list"
                v-on:click="selectDropdownItem(item)"
                v-on:mouseover="addDropdownItem(item)">
                {{item.label}}
            </li>
        </ul>
    </div>
</div>`;