export function load(){
    return{
        products : [
            { id: 1, image: '/src/lib/images/gulabos.jpg', name: 'Gulabos', pricing: { option_250g : 4.5, option_500g : 6.5, option_1Kg : 10} },
            { id: 2, image: '/src/lib/images/orelhudos.jpg', name: 'Orelhudos', pricing: { option_6: 4.5, option_12 : 6.5}},
            { id: 3, image: '/src/lib/images/palmier.jpg', name: 'Palmiers', pricing: {option_6: 6.5, option_12: 12} },
            { id: 4, image: '/src/lib/images/cinnamon.jpg', name: 'Cinnamon Rolls', pricing: {option_6 : 7, option_12: 14} }
        ]
    };
}