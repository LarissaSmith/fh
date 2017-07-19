export const EntryFieldTemplate =
`<div class="entry-field" v-on:click="focus()" :class="{'focus': hasFocus}">
    <label>{{fieldobj.label}}</label>
    <div class="entry-field__input" contenteditable="true" ref="input"></div>
    <div class="entry-field__error"></div>
</div>`;