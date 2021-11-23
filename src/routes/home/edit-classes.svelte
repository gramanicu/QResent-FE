<script>
    import AddSvg from '$components/svg/AddSvg.svelte';
    import CloseSvg from '$components/svg/CloseSvg.svelte';
    import TableInputText from '$components/table/TableInputText.svelte';
    import { callBackend } from '$lib/backend';
    import { roleFromEnum } from '$lib/backend';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';

    onMount(async () => {
        let userRole = roleFromEnum($role);
        if (!(userRole == 1)) {
            goto('/home');
            return;
        }

        try {
            const res = await callBackend('/subject/get-all', 'GET');
            res.forEach(subject => {
                subjects = [...subjects, { ...subject }];
            });
        } catch (err) {
            console.error(err);
        }
    });

    let subjects = [];
    let newSubjects = [];
    let deleteSubjects = [];

    let newSubject = {
        id: null,
        name: null,
        requirements: null,
        description: null,
        type: 'COURSE',
        professor_id: null,
    };

    /**
     * Edit subject's type
     * @param subject The name of the subject to change
     * @param type The new type of the class
     */
    async function changeSubjectType(name, type) {
        subjects.find(subject => subject.name == name).type = type;

        // This is done to update DOM
        subjects = subjects;
    }

    /**
     * Marks a subject for deletion
     * @param name The name of the subject to delete
     */
    async function removeSubject(name) {
        let d_subj = subjects.find(subject => subject.name == name);

        if (!d_subj) {
            d_subj = newSubjects.find(subject => subject.name == name);

            if (!d_subj) {
                return;
            }

            newSubjects = newSubjects.filter(subject => subject.name != name);
        } else {
            subjects = subjects.filter(subject => subject.name != name);
            deleteSubjects.push(d_subj);
        }
    }

    /**
     * Add a new subject to the list.
     */
    async function addSubject() {
        if (newSubject.name == null) newSubject.name = 'course';
        if (newSubject.description == null) newSubject.description = 'lorem ipsum';
        if (newSubject.requirements == null) newSubject.requirements = 'lorem ipsum';
        if (newSubject.type == null) newSubject.type = 'COURSE';
        if (newSubject.professor_id == null) newSubject.professor_id = 1;

        let full_subj = [...subjects, ...newSubjects];

        if (!full_subj.find(subj => subj.name == newSubject.name)) {
            newSubjects = [...newSubjects, { ...newSubject }];

            newSubject = {
                id: null,
                name: null,
                requirements: null,
                description: null,
                type: 'COURSE',
                professor_id: null,
            };
        } else {
            alert('Class name already in use');
        }
    }

    /**
     * Add a new subj request
     * @param subj The new subj
     */
    async function sendNewSubject(subj) {
        delete subj['id'];
        try {
            const res = await callBackend('/subject/add', 'POST', subj);
        } catch (err) {
            console.error(err);
        }
    }

    async function sendEditSubject(subj) {
        const id = subj.id;
        delete subj['id'];
        try {
            const res = await callBackend(`/subject/update/${id}`, 'PUT', subj);
        } catch (err) {
            console.error(err);
        }
    }
    async function sendDeleteSubject(subj) {
        const id = subj.id;
        delete subj['id'];
        try {
            const res = await callBackend(`/subject/delete/${id}`, 'DELETE');
        } catch (err) {
            console.error(err);
        }
    }

    async function refreshTable() {
        try {
            const res = await callBackend('/subject/get-all', 'GET');
            subjects = [];
            newSubjects = [];
            deleteSubjects = [];
            res.forEach(subject => {
                subjects = [...subjects, { ...subject }];
            });
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Save all the modifications done in the table
     */
    async function save() {
        for (const subj of subjects) {
            await sendEditSubject(subj);
        }

        for (const subj of newSubjects) {
            await sendNewSubject(subj);
        }

        for (const subj of deleteSubjects) {
            await sendDeleteSubject(subj);
        }

        await refreshTable();
    }
</script>

<div class="w-full overflow-x-auto min-h-full">
    <div class="p-4">
        <button on:click={save} class="btn btn-outline btn-success btn-block">Save</button>
    </div>

    <table class="table w-full border border-base-300">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th class="hidden lg:table-cell">Requirements</th>
                <th class="hidden lg:table-cell">Professor ID</th>
                <th>Type</th>
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
                        bind:value={newSubject.name}
                        name="name"
                        placeholder="Subject Name" />
                </td>
                <td>
                    <TableInputText
                        class="input-primary"
                        bind:value={newSubject.description}
                        name="description"
                        placeholder="Description" />
                </td>
                <td class="hidden lg:table-cell">
                    <TableInputText
                        class="input-primary"
                        bind:value={newSubject.requirements}
                        name="requirements"
                        placeholder="Requirements" />
                </td>
                <td class="hidden lg:table-cell">
                    <TableInputText
                        class="input-primary"
                        bind:value={newSubject.professor_id}
                        name="professor_id"
                        placeholder="Professor ID" />
                </td>
                <td class="dropdown">
                    <div tabindex="0" class="badge-lg badge cursor-pointer capitalize">
                        {newSubject.type}
                    </div>
                    <div
                        tabindex="0"
                        class="shadow-lg border mt-1 border-gray-300 card compact dropdown-content bg-base-100 rounded-box p-2 gap-1 menu">
                        <div
                            class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                            on:click={() => {
                                newSubject.type = 'COURSE';
                            }}>
                            {'COURSE'}
                        </div>
                        <div
                            class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                            on:click={() => {
                                newSubject.type = 'LABORATORY';
                            }}>
                            {'LABORATORY'}
                        </div>
                        <div
                            class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                            on:click={() => {
                                newSubject.type = 'SEMINAR';
                            }}>
                            {'SEMINAR'}
                        </div>
                    </div>
                </td>
                <td on:click={addSubject} class="sticky left-0 z-10 cursor-pointer text-white bg-neutral"
                    ><AddSvg /></td>
            </tr>

            {#each [...subjects, ...newSubjects] as subject, index}
                <tr class="">
                    <td class="sticky left-0 z-10">{index}</td>
                    <td>
                        <TableInputText
                            class="input-primary"
                            bind:value={subject.name}
                            name="name"
                            placeholder="Subject Name" />
                    </td>
                    <td>
                        <TableInputText
                            class="input-primary"
                            bind:value={subject.description}
                            name="description"
                            placeholder="Description" />
                    </td>
                    <td class="hidden lg:table-cell">
                        <TableInputText
                            class="input-primary"
                            bind:value={subject.requirements}
                            name="requirements"
                            placeholder="Requirements" />
                    </td>
                    <td class="hidden lg:table-cell">
                        <TableInputText
                            class="input-primary"
                            bind:value={subject.professor_id}
                            name="professor_id"
                            placeholder="Professor ID" />
                    </td>
                    <td class="dropdown">
                        <div tabindex="0" class="badge-lg badge cursor-pointer capitalize">
                            {subject.type}
                        </div>
                        <div
                            tabindex="0"
                            class="shadow-lg mt-1 border border-gray-300 card compact dropdown-content bg-base-100 rounded-box p-2 gap-1 menu">
                            <div
                                class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                                on:click={() => {
                                    changeSubjectType(subject.name, 'COURSE');
                                }}>
                                {'COURSE'}
                            </div>
                            <div
                                class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                                on:click={() => {
                                    changeSubjectType(subject.name, 'LABORATORY');
                                }}>
                                {'LABORATORY'}
                            </div>
                            <div
                                class="p-2 bg-base-100 cursor-pointer capitalize hover:bg-base-300 rounded-lg whitespace-nowrap"
                                on:click={() => {
                                    changeSubjectType(subject.name, 'SEMINAR');
                                }}>
                                {'SEMINAR'}
                            </div>
                        </div>
                    </td>
                    <td class="sticky left-0 z-10 cursor-pointer text-red-900" on:click={removeSubject(subject.id)}
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
