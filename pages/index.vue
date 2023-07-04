<template>
  <div class="container">
    <h1>Users</h1>

    <div
      v-if="error"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error:</strong> Delete Error
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="error = null"
      ></button>
    </div>
    <form>
      <div class="mb-3">
        <label for="exampleInputName1" class="form-label">Name</label>
        <input
          v-model="user"
          type="text"
          class="form-control"
          id="exampleInputName1"
          aria-describedby="nameHelp"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="addUser(user)"
      >
        Add Name
      </button>
    </form>
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
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deleteUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { H3Error } from "h3";
const users = ref(null);
const user = ref(null);
const error = ref(null);

users.value = await getUsers();

// Get users
async function getUsers() {
  return await $fetch("/api/users");
}

// Add user
async function addUser(user) {
  let addedUser = null;
  if (user)
    addedUser = await $fetch("/api/users", {
      method: "POST",
      body: {
        name: user,
      },
    });

  if (addedUser) users.value = await getUsers();
}

// Delete user
async function deleteUser(id) {
  let deleteUserOrError = null;
  if (id)
    deleteUserOrError = await $fetch("/api/users", {
      method: "DELETE",
      body: {
        id: id,
      },
    });

  if (deleteUserOrError instanceof H3Error) {
    error.value = deleteUserOrError;
    return;
  }

  users.value = await getUsers();
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
