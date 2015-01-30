```
// Show receipt for requested list, with the ability to start the payment.
.controller('PaymentCtrl', function ($scope, $stateParams, Lists, $location) {
    var listId = $stateParams.listId;

    $scope.list = Lists.get({ id: listId });

    $scope.total = function() {
        if (!$scope.list.products) {
            return 0
        }

        var total = 0;
        $scope.list.products.forEach(function (product) {
            total += product.scanned * product.price
        });
        return total;
    };

    // Show popup for cart inspection in a given percentage of the checkouts.
    if (Math.random() > 0.6) {
        $scope.showOverlay(
            '"Willekeurige" steekproef',
            'Helaas, u bent geselecteerd voor een steekproef. Een medewerker komt zo snel mogelijk bij u. Deze steekproef is volledig "willekeurig" en is bepaald ongeacht uw etniciteit.'
        );
    }

    // Show popup indicating that the payment is fulfilled.
    $scope.paymentCompletePopup = function () {
        $scope.showOverlay(
            'Betaling afgerond',
            'Uw betaling is afgerond.<br/><br/>Bedankt voor uw aankauf bei WOBBE ZWEITAUSEND!'
        );
    };

    // Fulfil payment when NFC tag is detected.
    $scope.$on('nfc-detected', function () {
        if ( ! $location.path().match(/^\/menu\/payment/)) {
            return;
        }
        $scope.paymentCompletePopup();
    });
})
;
```
