<script>
    import mainController from './mainController.js';
    import mementoes from '../../store.js';
    import './main.scss';

    $: memento = $mementoes.find(memento => memento.active);

    const uploadImage = (e) => {
        memento.icon = e.target.files[0].path;
    }

    const removeImage = () => {
        memento.icon = null;
    }

    const deleteMemento = () => {
        mementoes.update(currentMementoes => {
            return currentMementoes.filter(currentMemento => currentMemento.id !== memento.id);
        });
    }
</script>

<main>
    {#if memento}
        <div class="memento-wrapper">
            <div class="memento">
                <div class="memento-image-holder">
                    {#if memento.icon}
                        <img class="memento-image" src={memento.icon} alt="" />
                        <button class="remove-image" on:click={removeImage}>❎</button>
                    {:else}
                        <img src="img/image-placeholder.png" alt="" />
                        <input class="file-upload" type="file" on:change={uploadImage} />
                    {/if}
                </div>
                <h1 class="memento-title" contenteditable="true" bind:textContent={memento.title}>&nbsp;</h1>
                <div contenteditable="true" bind:innerHTML={memento.message}></div>
                <button class="delete" on:click={deleteMemento}>❌</button>
            </div>
            <div class="actions">
                <button class="button save-button" on:click={() => mainController.save(memento)}>Save</button>
                <button class="button preview-button" on:click={() => mainController.preview(memento)}>Preview</button>
                <div class="options">
                    <span class="date-time-title">Schedule</span>
                    <input type="date" bind:value={memento.settings.date} />
                    <input type="time" bind:value={memento.settings.time} />

                    <label class="repeat">
                        Remind every day
                        <input type="checkbox" bind:checked={memento.settings.repeat} />
                        <span class="input"></span>
                    </label>
                </div>
            </div>
        </div>
    {:else}
        <span class="no-data">🔘 Select or create a memento to get started</span>
    {/if}
</main>