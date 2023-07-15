<template>
  <div class="container">
    <h1>Users</h1>

    <!-- UsersModal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="editedUser.name"
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="editUser(editedUser)"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

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
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="
                {
                  editedUser.id = user.id;
                  editedUser.name = user.name;
                }
              "
            >
              Edit
            </button>
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

    <!-- MemosModal -->
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Edit User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="editedMemo.content"
              type="text"
              class="form-control"
              id="exampleInputContent1"
              aria-describedby="contentHelp"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="editMemo(editedMemo)"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <form>
      <div class="mb-3">
        <label for="exampleInputMemo1" class="form-label">Memo</label>
        <textarea
          v-model="memo"
          type="text"
          class="form-control"
          id="exampleInputMemo1"
          aria-describedby="memoHelp"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="addMemo(memo)"
      >
        Add Memo
      </button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Content</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(memo, index) in memos">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ memo.content }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              @click="
                {
                  editedMemo.id = memo.id;
                  editedMemo.content = memo.content;
                }
              "
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deleteMemo(memo.id)"
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
const editedUser = ref({
  id: null,
  name: null,
});

const memos = ref(null);
const memo = ref(null);
const editedMemo = ref({
  id: null,
  content: null,
});

users.value = await getUsers();
memos.value = await getMemos();

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

// Edit user
async function editUser(editedUser) {
  let user = null;

  if (editedUser.id && editedUser.name)
    user = await $fetch("/api/users", {
      method: "PUT",
      body: {
        id: editedUser.id,
        name: editedUser.name,
      },
    });

  if (user) users.value = await getUsers();
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

// Get memos
async function getMemos() {
  return await $fetch("/api/memos");
}

// Add memos
async function addMemo(memo) {
  let addedMemo = null;
  if (memo)
    addedMemo = await $fetch("/api/memos", {
      method: "POST",
      body: {
        content: memo,
      },
    });

  if (addedMemo) memos.value = await getMemos();
}

// Edit memo
async function editMemo(editedMemo) {
  let memo = null;

  if (editedMemo.id && editedMemo.content)
    memo = await $fetch("/api/memos", {
      method: "PUT",
      body: {
        id: editedMemo.id,
        content: editedMemo.content,
      },
    });

  if (memo) memos.value = await getMemos();
}

// Delete memo
async function deleteMemo(id) {
  let deleteMemoOrError = null;
  if (id)
    deleteMemoOrError = await $fetch("/api/memos", {
      method: "DELETE",
      body: {
        id: id,
      },
    });

  if (deleteMemoOrError instanceof H3Error) {
    error.value = deleteMemoOrError;
    return;
  }

  memos.value = await getMemos();
}

useHead({
  title: "Green Care",
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
