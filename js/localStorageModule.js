var localStorageModule = (() => {

    var _addItem = (item) => {
        localStorage.setItem('mediaList', JSON.stringify(item));
    };

    var _getAllItems = () => {
        return localStorage.getItem('mediaList');
    };

    var _clearAllItems = () => {
        localStorage.clear();
    };

    /** === PUBLIC FUNCTIONS === **/

    var addItem = (item) => {
        _addItem(item);
    };

    var getAllItems = () => {
        return _getAllItems();
    };

    var clearAllItems = () => {
        _clearAllItems();
    };

    /** === RETURNS === **/

    return {
        addItem: addItem,
        getAllItems: getAllItems,
        clearAllItem: clearAllItems
    }

})();