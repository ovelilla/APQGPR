var app = angular.module('APQGPR');
app.controller('controller.bookmark', function($scope, $rootScope) {

    var me = {};

    me.init = function() {
        $scope.bookmarkData = [];
    };

    me.boot = function() {
        me.init();
        me.events();

        if ($rootScope.app) {
            $rootScope.updateBookmarkData();
        }
    };

    me.events = function() {
        $rootScope.updateBookmarkData = function() {
            $rootScope.global.apps[$rootScope.app].app.getList('BookmarkList', function(reply) {
                var tempBookmarkData = [];

                for (var i = 0; i < reply.qBookmarkList.qItems.length; i++) {
                    tempBookmarkData.push({
                        id: reply.qBookmarkList.qItems[i].qInfo.qId,
                        name: reply.qBookmarkList.qItems[i].qData.title
                    });
                };

                $scope.bookmarkData = tempBookmarkData;
                $scope.$evalAsync();
            });
        };

        $scope.loadBookmark = function(bookmarkId) {
            $rootScope.global.apps[$rootScope.app].app.bookmark.apply(bookmarkId);
        };

        $scope.removeBookmark = function(bookmarkId) {
            $rootScope.global.apps[$rootScope.app].app.bookmark.remove(bookmarkId);
        };

        $scope.createBookmark = function() {
            var name = $('#bookmark-add-input').val();
            if (name && name !== '') {
                $scope.closeAddBookmark();
                $rootScope.global.apps[$rootScope.app].app.bookmark.create(name, '').then(function(reply) {
                    $rootScope.updateBookmarkData();
                });
            }
        };

        $scope.openAddBookmark = function() {
            $('#bookmark-open-btn').css('display', 'none');
            $('#bookmark-close-btn').css('display', 'inline');

            $('#bookmark-add-input').val('');
            $('#bookmark-add-container').css('display', 'block');
        };

        $scope.closeAddBookmark = function() {
            $('#bookmark-add-container').css('display', 'none');
            $('#bookmark-add-input').val('');

            $('#bookmark-open-btn').css('display', 'inline');
            $('#bookmark-close-btn').css('display', 'none');
        };

        $scope.onBookmarkInputKeyup = function(event) {
            if ($(event.target).val().length > 0) {
                $('#bookmark-create-btn').removeClass('disabled');
            } else {
                $('#bookmark-create-btn').removeClass('disabled').addClass('disabled');
            }
        };

        $scope.onRemoveBookmarkEnter = function(event) {
            $(event.target).addClass('fa-trash');
            $(event.target).removeClass('fa-trash-o');
        };

        $scope.onRemoveBookmarkLeave = function(event) {
            $(event.target).addClass('fa-trash-o');
            $(event.target).removeClass('fa-trash');
        };

        $scope.onOpenBookmarkEnter = function(event) {
            $(event.target).addClass('fa-plus-square');
            $(event.target).removeClass('fa-plus-square-o');
        };

        $scope.onOpenBookmarkLeave = function(event) {
            $(event.target).addClass('fa-plus-square-o');
            $(event.target).removeClass('fa-plus-square');
        };

        $scope.onCloseBookmarkEnter = function(event) {
            $(event.target).addClass('fa-minus-square');
            $(event.target).removeClass('fa-minus-square-o');
        };

        $scope.onCloseBookmarkLeave = function(event) {
            $(event.target).addClass('fa-minus-square-o');
            $(event.target).removeClass('fa-minus-square');
        };

        $scope.toggleBookmark = function(event) {
            $('#modalFlag, #modalFilter, #capsuleNav').removeClass("show");
            var bookmarkElement = $('#bookmark-container');
            $scope.closeAddBookmark();
            if (bookmarkElement.css('visibility') === 'visible') {
                // Disable Transition
                bookmarkElement.addClass('no-transition');
                $('.total-modal-bg').removeClass('show');

                bookmarkElement.css('visibility', 'hidden');
                bookmarkElement.css('opacity', 0);

                bookmarkElement[0].offsetHeight;
                bookmarkElement.removeClass('no-transition');
            } else {
                $('.total-modal-bg').addClass('show');
                // Disable transition delay
                bookmarkElement.addClass('no-transition-delay');

                bookmarkElement.css('visibility', 'visible');
                bookmarkElement.css('opacity', 1);

                bookmarkElement[0].offsetHeight;
                bookmarkElement.removeClass('no-transition-delay');
            }
        };

        $scope.onBookmarkContainerEnter = function() {
            var bookmarkElement = $('#bookmark-container');
            if (bookmarkElement.css('visibility') === 'visible') {
                // Disable transition delay
                bookmarkElement.addClass('no-transition-delay');

                bookmarkElement.css('visibility', 'visible');
                bookmarkElement.css('opacity', 1);

                bookmarkElement[0].offsetHeight;
                bookmarkElement.removeClass('no-transition-delay');
            }
        };

        $scope.onBookmarkContainerLeave = function() {
            var bookmarkElement = $('#bookmark-container');
            if (!$('#bookmark-add-input').is(':focus') && bookmarkElement.css('opacity') === '1') {
                bookmarkElement.css('visibility', 'hidden');
                bookmarkElement.css('opacity', 0);
            }
        };

        document.onkeydown = function(event) {
            event = event || window.event;
            var isEscape = false;
            if ('key' in event) {
                isEscape = (event.key === 'Escape' || event.key === 'Esc');
            } else {
                isEscape = (event.keyCode == 27);
            }

            if (isEscape) {
                // Check if Esc is pressed while bookmark is open
                var bookmarkElement = $('#bookmark-container');
                if (bookmarkElement && bookmarkElement.is(':visible') && !$('#bookmark-add-input').is(':focus')) {
                    // Disable Transition
                    bookmarkElement.addClass('no-transition');

                    bookmarkElement.css('visibility', 'hidden');
                    bookmarkElement.css('opacity', 0);

                    bookmarkElement[0].offsetHeight;
                    bookmarkElement.removeClass('no-transition');
                }
            }
        };
    };

    me.boot();
});
