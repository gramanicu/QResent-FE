<script>
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { onMount } from 'svelte';

    onMount(async () => {
        let userRole = roleFromEnum($role);
        if (!(userRole == 1)) {
            goto('/home');
            return;
        }

        try {
            const res_subjects = await callBackend('/subject/get-all', 'GET');

            for (const subj of res_subjects) {
                const res_meetings = await callBackend(`/subject/get-meetings-by-subjectid/${subj.id}`, 'GET');

                for (const meet of res_meetings) {
                    meet.startTime = new Date(meet.startTime);
                    meet.endTime = new Date(meet.endTime);

                    const res_headcounts = await callBackend(`/meeting/get-all-headcounts/${meet.id}`, 'GET');

                    for (const hc of res_headcounts) {
                        hc.expiresAt = new Date(hc.expiresAt);
                        hc.doneAt = hc.expiresAt - meet.startTime;
                        hc.doneAt = Math.floor(hc.doneAt / 1000 / 60);

                        const res_students = await callBackend(
                            `/headcount/get-students-by-headcountid/${hc.token}`,
                            'GET'
                        );
                        hc.students = res_students;
                    }
                    meet.headcounts = res_headcounts;
                }

                subj.meetings = res_meetings;
                subjects = [...subjects, { ...subj }];
            }
        } catch (err) {
            console.error(err);
        }
    });

    let subjects = [];

    async function downloadAttendance(students, subject, meet_num, head_num) {
        let studentList = [];

        for (const student of students) {
            const newStudent = {
                firstName: student.appUser.firstName,
                lastName: student.appUser.lastName,
                username: student.appUser.username,
                email: student.appUser.email,
            };
            studentList = [...studentList, { ...newStudent }];
        }

        const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
        const header = Object.keys(studentList[0]);
        const csv = [
            header.join(','), // header row first
            ...studentList.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')),
        ].join('\r\n');

        let pom = document.createElement('a');
        let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        let url = URL.createObjectURL(blob);

        pom.href = url;
        const name = `${subject.name}-meet${meet_num}-headcount${head_num}`;
        pom.setAttribute('download', `${name}.csv`);
        pom.click();
    }
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>Classes statistics page</title>
    <meta name="description" content="The page where professors can view the statistics for their classes" />
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="card mt-4 mx-4 p-2 rounded-lg shadow-xl border">
    <h1 class="card-title mx-4 mt-2">Subjects</h1>
    {#each subjects as subj, index}
        <div tabindex="0" class="collapse rounded-lg collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                <h1 class="inline-block">{subj.name}</h1>
                <small class="inline-block lowercase text-sm">({subj.type})</small>
            </div>
            <div class="collapse-content flex flex-col">
                {#if subj.meetings && subj.meetings.length != 0}
                    {#each subj.meetings as meet, index}
                        <div class="shadow-xl mt-2 card bg-secondary text-secondary-content p-4">
                            <div class="card-title">Meeting #{index + 1}</div>
                            <div class="flex flex-col">
                                {#if meet.headcounts && meet.headcounts.length != 0}
                                    {#each meet.headcounts as headcount, h_index}
                                        <div class="flex flex-row">
                                            <div class="inline-block">
                                                {#if headcount.students && headcount.students.length != 0}
                                                    Headcount #{h_index + 1} - {headcount.students.length} students present
                                                    at minute
                                                    {headcount.doneAt}
                                                {:else}
                                                    Headcount #{h_index + 1} - No students verified
                                                {/if}
                                            </div>
                                            {#if headcount.students && headcount.students.length != 0}
                                                <button
                                                    class="btn btn-xs ml-2"
                                                    on:click={() =>
                                                        downloadAttendance(
                                                            headcount.students,
                                                            subj,
                                                            index + 1,
                                                            h_index + 1
                                                        )}>Download</button>
                                            {/if}
                                        </div>
                                    {/each}
                                {:else}
                                    <h2>No headcounts</h2>
                                {/if}
                            </div>
                        </div>
                    {/each}
                {:else}
                    <h2>No meetings</h2>
                {/if}
            </div>
        </div>
    {/each}
</div>
