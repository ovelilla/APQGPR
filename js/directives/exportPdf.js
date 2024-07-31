'use strict';

var app = angular.module('APQGPR');
app.directive('exportPdf', function ($rootScope) {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function (event) {
                var qlikid = attrs.qlikid;
                console.log('Clic en el botón para exportar a PDF. QlikID:', qlikid);

                $rootScope.global.apps[$rootScope.app].visualization.get(qlikid).then(function (vis) {
                    var settings = {
                        documentSize: 'A4',
                        orientation: 'landscape',
                        aspectRatio: 2
                    };
                    console.log('Configuración de exportación a PDF:', settings);

                    // Aunque la función app.visualization.get no tiene un método directo para exportar a PDF, puedes usarla para obtener una referencia a la visualización.
                    // Luego, puedes usar otras funciones o métodos específicos para exportar si están disponibles en tu versión de Qlik Sense.
                    // Aquí, se usa un ejemplo hipotético para exportar a PDF. Consulta la documentación de Qlik Sense para las funciones disponibles en tu versión.

                    vis.exportPdf(settings).then(function (result) {
                        console.log('PDF download link:', result);

                        // Crear un enlace invisible y simular un clic para descargar el archivo
                        var a = document.createElement('a');
                        a.href = result;
                        a.download = 'exported-object.pdf';
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);

                        console.log('Exportación a PDF completada con éxito.');
                    }).catch(function (error) {
                        console.error('Error al exportar a PDF:', error);
                    });
                });
            });
        }
    };
});