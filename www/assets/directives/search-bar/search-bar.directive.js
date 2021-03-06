export default function SearchBarDirective() {
    return {
        restrict: "E",
        template: require("./search-bar.directive.html"),
        controller: SearchBarController,
        scope: {},
        controllerAs: "vm",
        bindToController: true
    };
}

function SearchBarController($state, $http, $q, ProductsService) {
    var vm = this;
    vm.placeholder = "Find products locally";
    var throttledSearchSuggestions = _.throttle(function(value) {
        return getSearchSuggestions(value) || [];
    }, 2000);

    vm.throttledSearchSuggestions = throttledSearchSuggestions;
    vm.itemSelected = itemSelected;

    function getSearchSuggestions(value) {
        return ProductsService.search(value).then(
            function(searchResponse) {
                return searchResponse;
            },
            function error(errorResponse) {
                console.log("errorResponse", errorResponse);
                return [];
            }
        );
    }

    function itemSelected(item) {
        if (item) {
            // TODO: save search text in cookie to keep after research
            // TODO: add resolve at 'public.root.products' ?!? it would make 'public.root.products' reusable
            $state.go("public.root.products", {
                q: item.text
            });
        }
    }
}
