$(document).ready(function(){

    var multipleCancelButton = new Choices('#device', {
        maxItemCount: 5,
        removeItemButton: true,
        itemSelectText: 'Selecione',
        editItems: false,
        silent: true,
        placeholder: true,
        placeholderValue: 'Selecione os dipositivos.',

        maxItemText: (maxItemCount) => {
          return `Somente ${maxItemCount} dispositivos podem ser adicionados`;
        },
    });


});

