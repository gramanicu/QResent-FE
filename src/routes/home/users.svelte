<script>
    import AddSvg from '$components/svg/AddSvg.svelte';
    import CloseSvg from '$components/svg/CloseSvg.svelte';
    import TableInputEmail from '$components/table/TableInputEmail.svelte';
    import TableInputText from '$components/table/TableInputText.svelte';
    import { roleToString } from '$lib/backend';
    import { auth } from '$stores/user';

    $auth.user.role = 0;

    let users = [
        {
            id: '1',
            username: 'john doe',
            email: 'a.a@stud.acs.upb.ro',
            first_name: 'john',
            last_name: 'doe',
            role: '1',
        },
    ];

    let newUser = {
        id: null,
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        role: '1',
    };

    async function changeUserRole(user_id, role_id) {
        users.find(user => user.id == user_id).role = role_id;

        // This is done to update DOM
        users = users;
    }

    async function removeUser(user_id) {
        users = users.filter(user => user.id != user_id);
    }

    async function addUser() {
        if (newUser.username == null) newUser.username = 'John Doe';
        if (newUser.email == null) newUser.email = 'john.doe@stud.acs.upb.ro';
        if (newUser.first_name == null) newUser.first_name = 'John';
        if (newUser.last_name == null) newUser.last_name = 'Doe';

        users = [...users, { ...newUser }];

        newUser = {
            id: null,
            username: null,
            email: null,
            first_name: null,
            last_name: null,
            role: '1',
        };
    }
</script>

<div class="w-full overflow-x-auto min-h-full">
    <div class="p-4">
        <button class="btn btn-outline btn-success btn-block">Save</button>
    </div>

    <table class="table w-full border border-base-300">
        <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th class="hidden lg:table-cell">First Name</th>
                <th class="hidden lg:table-cell">Last Name</th>
                <th>Role</th>
                <th />
            </tr>
        </thead>
        <tbody>
            <!-- Add new user row -->
            <tr class="active">
                <td class="sticky left-0 z-10" />
                <td>
                    <TableInputText
                        class="input-primary"
                        bind:value={newUser.username}
                        name="username"
                        placeholder="Username" />
                </td>
                <td>
                    <TableInputEmail
                        class="input-primary"
                        bind:value={newUser.email}
                        name="email"
                        placeholder="Email" />
                </td>
                <td class="hidden lg:table-cell">
                    <TableInputText
                        class="input-primary"
                        bind:value={newUser.first_name}
                        name="First Name"
                        placeholder="First Name" />
                </td>
                <td class="hidden lg:table-cell">
                    <TableInputText
                        class="input-primary"
                        bind:value={newUser.last_name}
                        name="Last Name"
                        placeholder="Last Name" />
                </td>
                <td class="dropdown">
                    <div tabindex="0" class="badge-lg badge cursor-pointer capitalize">
                        {roleToString(newUser.role)}
                    </div>
                    <div
                        tabindex="0"
                        class="shadow-lg border mt-1 border-gray-300 card compact dropdown-content bg-base-100 rounded-box p-2 gap-1 menu">
                        {#each Array(3) as _, role_id}
                            <div
                                class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                                on:click={() => {
                                    newUser.role = role_id;
                                }}>
                                {roleToString(role_id)}
                            </div>
                        {/each}
                    </div>
                </td>
                <td on:click={addUser} class="sticky left-0 z-10 cursor-pointer text-white bg-neutral"><AddSvg /></td>
            </tr>

            {#each users as user, index}
                <tr class="">
                    <td class="sticky left-0 z-10">{index}</td>
                    <td><TableInputText bind:value={user.username} name="username" placeholder="Username" /></td>
                    <td>
                        <TableInputEmail
                            bind:value={user.email}
                            disabled="true"
                            class="cursor-default"
                            name="email"
                            placeholder="Email" />
                    </td>
                    <td class="hidden lg:table-cell"
                        ><TableInputText bind:value={user.first_name} name="First Name" placeholder="First Name" /></td>
                    <td class="hidden lg:table-cell"
                        ><TableInputText bind:value={user.last_name} name="Last Name" placeholder="Last Name" /></td>

                    <td class="dropdown">
                        <div tabindex="0" class="badge-lg badge cursor-pointer capitalize">
                            {roleToString(user.role)}
                        </div>
                        <div
                            tabindex="0"
                            class="shadow-lg mt-1 border border-gray-300 card compact dropdown-content bg-base-100 rounded-box p-2 gap-1 menu">
                            {#each Array(3) as _, role_id}
                                <div
                                    class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                                    on:click={() => changeUserRole(user.id, role_id)}>
                                    {roleToString(role_id)}
                                </div>
                            {/each}
                        </div>
                    </td>
                    <td class="sticky left-0 z-10 cursor-pointer text-red-900" on:click={removeUser(user.id)}
                        ><CloseSvg /></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style lang="scss">
    table.table {
        overflow-x: auto;
    }

    td.dropdown {
        display: table-cell;
    }

    * :global(.cursor-default) {
        cursor: default !important;
    }
</style>
