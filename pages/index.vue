<template>
  <div class="container">
    <h1>Users</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>
            <button type="button" class="btn btn-warning btn-sm">Edit</button>
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const users = ref(null);
users.value = await getUsers();
console.log("users: ", users.value);

// get users
async function getUsers() {
  return await $fetch("/api/users");
}

useHead({
  title: "Users Prisma Example",
  link: {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    type: "text/css",
  },
  script: {
    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
  },
});
</script>
