(function () {
    "use strict";

    angular
        .module("app.lodash")
        .factory("_", LodashService);

    LodashService.inject = ['$window'];

    function LodashService($window) {

        // Get a local handle on the global lodash reference.
        var _ = $window._;
        _.sformat = sformat;
        _.capitalizeFirstLetter = capitalizeFirstLetter;
        _.getErrorMessage = getErrorMessage;
        _.flattenItems = flattenItems;
        _.findItem = findItem;
        _.findParentItem = findParentItem;
        _.searchTree = searchTree;
        // OPTIONAL: Sometimes I like to delete the global reference to make sure
        // that no one on the team gets lazy and tried to reference the library
        // without injecting it. It's an easy mistake to make, and one that won't
        // throw an error (since the core library is globally accessible).
        // ALSO: See .run() block above.
        //delete( $window._ );


        // ---
        // CUSTOM LODASH METHODS.
        // ---

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } // capitalizeFirstLetter

        // String.Format
        // Call type 1:
        // _.sformat("Test value: {0}", 123);
        //
        // Call type 2:
        // var obj = { paramName: 123 }
        // _.sformat("Test value: {paramName}", obj);
        //
        function sformat() {
            var args = arguments,
                replaced;

            if (args.length === 2 && typeof args[1] === 'object') {
                var s = args[0];
                var kwords = args[1];
                replaced = sformatKeywords(s, kwords);
            }
            else {
                replaced = sformatNumbers.apply(arguments);
            }

            return replaced;
        } // sformat

        function sformatKeywords(string, kwargs) {
            return string.replace(/{([a-zA-Z0-9]+)}/g, function (match, varName) {
                return typeof kwargs[varName] !== 'undefined' ? kwargs[varName] : match;
            });
        } // sformatKeywords

        function sformatNumbers(s) {
            var args = Array.prototype.slice.call(arguments, 1);
            return s.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        } // sformatNumbers

        function getErrorMessage(err) {
            return (err && err.message) || (err && err.Message) || err;
        } // getErrorMessage

        // Return the [formerly global] reference so that it can be injected
        // into other aspects of the AngularJS application.

        // Another lodash option with children key and unlimited levels deep.
        // Usege: flattenItems(items, "children") returns flatten array of items and all descendants childrens
        function flattenItems(items, key) {
            return items.reduce(function (flattenedItems, item) {
                flattenedItems.push(item)
                if (Array.isArray(item[key])) {
                    flattenedItems = flattenedItems.concat(flattenItems(item[key], key))
                }
                return flattenedItems
            }, []);
        } //

        // Find first item by id in items and childrens
        function findItem(items, id) {
            var i = 0, found;

            for (; i < items.length; i++) {
                if (items[i].id === id) {
                    return items[i];
                } else if (_.isArray(items[i].children)) {
                    found = findItem(items[i].children, id);
                    if (found) {
                        return found;
                    }
                }
            }
        } // findItem

        function findParentItem(items, childId, parent){
            var i = 0, found;
            for (; i < items.length; i++) {
                if (items[i].id === childId) {
                    return parent;
                } else if (_.isArray(items[i].children)) {
                    parent = items[i];
                    found = findParentItem(parent.children, childId, parent);
                    if (found) {
                        return found;
                    }
                }
            }
        } // findParentItem

        // Searches items tree for object with specified prop with value
        //
        // @param {object} tree nodes tree with children items in nodesProp[] table, with one (object) or many (array of objects) roots
        // @param {string} propNodes name of prop that holds child nodes array
        // @param {string} prop name of searched node's prop
        // @param {mixed} value value of searched node's  prop
        // @returns {object/null} returns first object that match supplied arguments (prop: value) or null if no matching object was found
        function searchTree(tree, nodesProp, prop, value) {
            var i, f = null; // iterator, found node
            if (Array.isArray(tree)) { // if entry object is array objects, check each object
                for (i = 0; i < tree.length; i++) {
                    f = searchTree(tree[i], nodesProp, prop, value);
                    if (f) { // if found matching object, return it.
                        return f;
                    }
                }
            } else if (typeof tree === 'object') { // standard tree node (one root)
                if (tree[prop] !== undefined && tree[prop] === value) {
                    return tree; // found matching node
                }
            }
            if (tree[nodesProp] !== undefined && tree[nodesProp].length > 0) { // if this is not maching node, search nodes, children (if prop exist and it is not empty)
                return searchTree(tree[nodesProp], nodesProp, prop, value);
            } else {
                return null; // node does not match and it neither have children
            }
        } // searchTree

        // function findParentItem(allItems, childId) {
        //     for(var i = 0; i<allItems.length; i<allItems.length){
        //
        //     }
        // } // findParentItem

        // Export
        return ( _ );
    }
})();