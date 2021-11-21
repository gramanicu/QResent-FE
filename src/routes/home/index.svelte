<script>
    import { auth } from '$stores/user';

    $auth.user.role = 3;
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>QResent Home</title>
    <meta name="description" content="The QResent user homepage" />
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="p-4 rounded-lg bg-gray-300 m-4 border border-gray-600 flex flex-col gap-4">
    <div class="btn btn-block"><a href="/home/users">Admin homepage</a></div>
    <div class="btn btn-block"><a href="/home/classes">Professor homepage</a></div>
    <div class="btn btn-block"><a href="/home/validate">Student homepage</a></div>
</div>
