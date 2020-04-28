import mementoes from '../../store.js';

export default {

    addMemento() {
        mementoes.update(memento => [...memento, {
            id: memento.length ? memento[memento.length - 1].id + 1 : 0,
            icon: null, 
            title: 'Your Notification\'s Title 👋',
            message: 'This is your notification’s body. You should aim for a length below 100 characters to keep content visible.',
            settings: {
                date: new Date().toISOString().split('T')[0],
                time: '12:00',
                repeat: false
            }
        }]);
    },

    selectMemento(id) {
        mementoes.update(mementoes => {
            return mementoes.map(memento => {
                if (memento.id === id) {
                    memento.active = true;
                } else {
                    delete memento.active;
                }

                return memento;
            });
        });
    }
}