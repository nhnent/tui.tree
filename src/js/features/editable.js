/**
 * @fileoverview Feature that each tree node is possible to edit as double click
 * @author NHN Ent. FE dev Lab <dl_javascript@nhnent.com>
 */
var util = require('./../util');
var ajaxCommand = require('./../consts/ajaxCommand');
var states = require('./../consts/states');
var snippet = require('tui-code-snippet');

var API_LIST = [
    'createChildNode',
    'editNode',
    'finishEditing'
];
var EDIT_TYPE = {
    CREATE: 'create',
    UPDATE: 'update'
};
var WRAPPER_CLASSNAME = 'tui-input-wrap';
var INPUT_CLASSNAME = 'tui-tree-input';

/**
 * Set the tree selectable
 * @class Editable
 * @param {Tree} tree - Tree
 * @param {Object} options - Options
 *  @param {string} options.editableClassName - Classname of editable element
 *  @param {string} options.dataKey - Key of node data to set value
 *  @param {string} [options.dataValue] - Value of node data to set value (Use "createNode" API)
 *  @param {string} [options.inputClassName] - Classname of input element
 * @ignore
 */
var Editable = snippet.defineClass(/** @lends Editable.prototype */{/*eslint-disable*/
    static: {
        /**
         * @static
         * @memberof Selectable
         * @returns {Array.<string>} API list of Editable
         */
        getAPIList: function() {
            return API_LIST.slice();
        }
    },
    init: function(tree, options) {
        options = snippet.extend({}, options);

        /**
         * Tree
         * @type {Tree}
         */
        this.tree = tree;

        /**
         * Classname of editable element
         * @type {string}
         */
        this.editableClassName = options.editableClassName || tree.classNames.textClass;

        /**
         * Key of node data to set value
         * @type {string}
         */
        this.dataKey = options.dataKey;

        /**
         * Default value for creating node
         * @type {string}
         */
        this.defaultValue = options.defaultValue || '';

        /**
         * Input element for create or edit
         * @type {HTMLElement}
         */
        this.inputElement = null;

        /**
         * Action mode - create or edit
         * @type {string}
         */
        this.mode = null;

        /**
         * For block blur when unintentional blur event occur when alert popup
         * @type {Boolean}
         */
        this._blockBlur = false;

        /**
         * Keyup event handler
         * @type {Function}
         */
        this.boundOnKeyup = snippet.bind(this._onKeyup, this);

        /**
         * Blur event handler
         * @type {Function}
         */
        this.boundOnBlur = snippet.bind(this._onBlur, this);

        tree.on('doubleClick', this._onDoubleClick, this);

        this._setAPIs();
    },

    /**
     * Disable this module
     */
    destroy: function() {
        var tree = this.tree;

        this._detachInputElement();
        tree.off(this);
        snippet.forEach(API_LIST, function(apiName) {
            delete tree[apiName];
        });
    },

    /**
     * Create child node
     * @memberof Tree.prototype
     * @requires Editable
     * @param {string} parentId - Parent node id to create new node
     * @example
     * tree.createChildNode('tui-tree-node-1');
     */
    createChildNode: function(parentId) {
        var tree = this.tree;
        var useAjax = tree.enabledFeatures.Ajax;
        var nodeId;

        this.mode = EDIT_TYPE.CREATE;

        if (useAjax) {
            tree.on('successAjaxResponse', this._onSuccessResponse, this);
        }

        if (!tree.isLeaf(parentId) &&
            tree.getState(parentId) === states.node.CLOSED) {
            tree.open(parentId);
        } else {
            nodeId = tree._add({}, parentId)[0];
            this._attachInputElement(nodeId);
        }
    },

    /**
     * Edit node
     * @memberof Tree.prototype
     * @requires Editable
     * @param {string} nodeId - Node id
     * @example
     * tree.editNode('tui-tree-node-1');
     */
    editNode: function(nodeId) {
        this.mode = EDIT_TYPE.UPDATE;
        this._attachInputElement(nodeId);
    },

    /**
     * Exit edit though remove input tag
     * @memberof Tree.prototype
     * @requires Editable
     * @example
     * tree.finishEditing();
     */
    finishEditing: function() {
        if (this.inputElement) {
            this._detachInputElement();
        }
    },

    /**
     * Custom event handler "successResponse"
     * @param {string} type - Ajax command type
     * @param {Array.<string>} nodeIds - Added node ids on tree
     * @private
     */
    _onSuccessResponse: function(type, nodeIds) {
        var tree = this.tree;
        var parentId, nodeId;

        if (type === ajaxCommand.READ && nodeIds) {
            parentId = tree.getParentId(nodeIds[0]);
            nodeId = tree._add({}, parentId)[0];
            this._attachInputElement(nodeId);
        }
    },

    /**
     * Custom event handler "doubleClick"
     * @param {MouseEvent} event - Mouse event
     * @private
     */
    _onDoubleClick: function(event) {
        var target = util.getTarget(event);
        var nodeId;

        if (util.hasClass(target, this.editableClassName)) {
            nodeId = this.tree.getNodeIdFromElement(target);
            this.editNode(nodeId);
        }
    },

    /**
     * InputElement is keep going
     * @private
     */
    _keepEdit: function() {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    },

    /**
     * Invoke 'beforeCreateChildNode'
     * @param {Event} event - Information of 'beforeCreateChildNode'
     * @private
     */
    _invokeBeforeCreateChildNode: function(event) {
        /**
         * @event Tree#beforeCreateChildNode
         * @param {{value: string}} evt - Event data
         *     @param {string} evt.value - Return value of creating input element
         *     @param {string} evt.nodeId - Return id of creating node
         *     @param {string} cause - Return 'blur' or 'enter' according cause of the event
         * @example
         * tree
         *  .enableFeature('Editable')
         *  .on('beforeCreateChildNode', function(evt) {
         *      console.log(evt.value);
         *      console.log(evt.nodeId);
         *      console.log(evt.cause);
         *      return false; // It cancels
         *      // return true; // It execute next
         *  });
         */
        return this.tree.invoke('beforeCreateChildNode', event);
    },

    /**
     * Invoke 'beforeEditNode'
     * @param {Event} event - Information of 'beforeEditNode'
     * @private
     */
    _invokeBeforeEditNode: function(event) {
        /**
         * @event Tree#beforeEditNode
         * @param {{value: string}} evt - Event data
         *     @param {string} evt.value - Return value of creating input element
         *     @param {string} evt.nodeId - Return id of editing node
         *     @param {string} evt.cause - Return 'blur' or 'enter' according cause of the event
         * @example
         * tree
         *  .enableFeature('Editable')
         *  .on('beforeEditNode', function(evt) {
         *      console.log(evt.value);
         *      console.log(evt.nodeId);
         *      console.log(evt.cause);
         *      return false; // It cancels
         *      // return true; // It execute next
         *  });
         */
        return this.tree.invoke('beforeEditNode', event);
    },

    /**
     * Reflect the value of inputElement to node for creating or editing
     * @private
     */
    _submitInputResult: function(cause) {
        var tree = this.tree;
        var nodeId = tree.getNodeIdFromElement(this.inputElement);
        var value = this.inputElement.value;
        var event = {
            value: value,
            nodeId: nodeId,
            cause: cause
        };

        if (this.mode === EDIT_TYPE.CREATE) {
            if (!this._invokeBeforeCreateChildNode(event)) {
                this._keepEdit();

                return false;
            }
            this._addData(nodeId, value);
        } else {
            if (!this._invokeBeforeEditNode(event)) {
                this._keepEdit();

                return false;
            }
            this._setData(nodeId, value);
        }
        this._detachInputElement();

        return true;
    },

    /**
     * Event handler: keyup - input element
     * @param {Event} event - Key event
     * @private
     */
    _onKeyup: function(event) {
        if (util.getKeyCode(event) === 13) {
            this._blockBlur = true;
            this._submitInputResult('enter');
        }
    },

    /**
     * Event handler: blur - input element
     * @private
     */
    _onBlur: function() {
        if (this._blockBlur) {
            this._blockBlur = false;
        } else {
            this._blockBlur = !this._submitInputResult('blur');
        }
    },

    /**
     * Create input element
     * @returns {HTMLElement} Input element
     * @private
     */
    _createInputElement: function() {
        var element = document.createElement('INPUT');
        element.setAttribute('type', 'text');
        util.addClass(element, INPUT_CLASSNAME);

        return element;
    },

    /**
     * Attach input element on tree
     * @param {string} nodeId - Node id
     * @private
     */
    _attachInputElement: function(nodeId) {
        var tree = this.tree;
        var target = document.getElementById(nodeId);
        var wrapperElement = document.createElement('DIV');
        var inputElement = this._createInputElement();

        if (!target) {
            return;
        }

        wrapperElement = util.getChildElementByClassName(target, WRAPPER_CLASSNAME);

        if (!wrapperElement) {
            wrapperElement = document.createElement('DIV');
            inputElement = this._createInputElement();

            util.addClass(wrapperElement, WRAPPER_CLASSNAME);
            wrapperElement.style.paddingLeft = tree.getIndentWidth(nodeId) + 'px';

            inputElement.value = tree.getNodeData(nodeId)[this.dataKey] || '';

            wrapperElement.appendChild(inputElement);
            target.appendChild(wrapperElement);

            util.addEventListener(inputElement, 'keyup', this.boundOnKeyup);
            util.addEventListener(inputElement, 'blur', this.boundOnBlur);

            if (this.inputElement) {
                this.inputElement.blur();
            }
            this.inputElement = inputElement;
        }

        this._blockBlur = false;
        this.inputElement.focus();
    },

    /**
     * Detach input element on tree
     * @private
     */
    _detachInputElement: function() {
        var tree = this.tree;
        var inputElement = this.inputElement;
        var wrapperElement = this.inputElement.parentNode;

        util.removeEventListener(inputElement, 'keyup', this.boundOnKeyup);
        util.removeEventListener(inputElement, 'blur', this.boundOnBlur);

        util.removeElement(wrapperElement)

        if (tree.enabledFeatures.Ajax) {
            tree.off(this, 'successAjaxResponse');
        }

        this.inputElement = null;
    },

    /**
     * Add data of input element to node and detach input element on tree
     * @param {string} nodeId - Node id to add
     * @param {string} value - Content for that node
     * @private
     */
    _addData: function(nodeId, value) {
        var tree = this.tree;
        var parentId = tree.getParentId(nodeId);
        var data = {};

        if (nodeId) {
            data[this.dataKey] = value || this.defaultValue;
            tree._remove(nodeId);
            tree.add(data, parentId);
        }
    },

    /**
     * Set data of input element to node and detach input element on tree
     * @param {string} nodeId - Node id to change
     * @param {string} value - Content for that node
     * @private
     */
    _setData: function(nodeId, value) {
        var tree = this.tree;
        var data = {};

        if (nodeId) {
            data[this.dataKey] = value;
            tree.setNodeData(nodeId, data);
        }
    },

    /**
     * Set apis of selectable tree
     * @private
     */
    _setAPIs: function() {
        var tree = this.tree;
        var bind = snippet.bind;

        snippet.forEach(API_LIST, function(apiName) {
            tree[apiName] = bind(this[apiName], this);
        }, this);
    }
});

module.exports = Editable;
