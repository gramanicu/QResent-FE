<script>
    import { user } from '$stores/user';

    $user.role = 1;
    let classes = [
        { description: 'test', name: 'mate', requirements: 'nimic', type: 'laborator' },
        { description: 'test', name: 'fizica', requirements: 'nimic', type: 'seminar' },
    ];
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>Classes management</title>
    <meta name="description" content="The page where professors can manage their classes" />
    <meta name="robots" content="noindex" />
</svelte:head>

{#each classes as cl, index}
    <div tabindex="0" class="collapse w-96">
        <div class="collapse-title text-xl font-medium">{cl.name} - {cl.type}</div>
        <div class="collapse-content">
            <div class="flex flex-col">
                <p>Name: {cl.name}</p>
                <p>Description: {cl.description}</p>
                <p>Requirements: {cl.requirements}</p>
                <p>Type: {cl.type}</p>
            </div>
        </div>
    </div>
{/each}
