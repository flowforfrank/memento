<script>
    import sidebarController from './sidebarController.js';
    import mementoes from '../../store.js';
    import './sidebar.scss';
</script>

<div class="sidebar">
    <button class="add-memento" on:click={sidebarController.addMemento}>Add Memento</button>

    <ul class="mementoes">
        {#each $mementoes as memento}
            <li class="memento-item" class:active={memento.active}
                on:click={() => sidebarController.selectMemento(memento.id)}>
                {memento.title}
            </li>
        {/each}
    </ul>
</div>