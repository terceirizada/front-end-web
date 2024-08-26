<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Search,
  AlignJustify,
  Bell,
  X,
  CircleUser,
  Home,
} from "lucide-vue-next";
import ProcessesTable from "./ProcessesTable.vue";
import AppLogo from "./AppLogo.vue";
import { useAuth } from "../hooks/useAuth";
import PrimaryButton from "./PrimaryButton.vue";
import { useRouter } from "vue-router";

const user = {
  name: "Nome do usuário",
  email: "emaildousuario@example.com",
};
const navigation = [{ name: "Home", href: "/flow", current: true }];

const auth = useAuth();
const router = useRouter();

const userNavigation = [
  { name: "Perfil", action: () => {} },
  { name: "Configurações", action: ()=> {} },
  { name: "Sair", action: async () => await auth.logOut(router) },
];
</script>
<template>
  <div class="min-h-full">
    <div class="bg-indigo-600 pb-32">
      <Disclosure
        as="nav"
        class="border-b border-indigo-300 border-opacity-25 bg-neutral-100 lg:border-none"
        v-slot="{ open }"
      >
        <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div
            class="relative flex h-24 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"
          >
            <div class="flex items-center px-2 lg:px-0">
              <div class="flex-shrink-0">
                <AppLogo />
              </div>
              <div class="hidden lg:ml-10 lg:block">
                <div class="flex space-x-4">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'text-indigo-600 text-lg font-bold'
                        : 'text-neutral-500 hover:bg-indigo-400 hover:bg-opacity-75',
                      'rounded-md py-2 px-3 text-sm font-bold',
                      'flex gap-2 items-center',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <Home :size="24" /> Home</a
                  >
                </div>
              </div>
            </div>
            <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
              <div class="w-full max-w-lg lg:max-w-xs">
                <label for="search" class="sr-only">Buscar</label>
                <div class="relative text-gray-400 focus-within:text-gray-600">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <Search :size="24" />
                  </div>
                  <input
                    id="search"
                    class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div class="flex lg:hidden">
              <DisclosureButton
                class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                <span class="sr-only">Open main menu</span>
                <AlignJustify v-if="!open" :size="24" />
                <X v-else :size="24" />
              </DisclosureButton>
            </div>
            <div class="hidden lg:ml-4 lg:block">
              <div class="flex items-center">
                <button
                  type="button"
                  class="flex-shrink-0 rounded-full p-1 text-neutral-500 hover:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  <span class="sr-only">View notifications</span>
                  <Bell :size="24" />
                </button>
                <Menu as="div" class="relative ml-3 flex-shrink-0">
                  <div>
                    <MenuButton
                      class="flex rounded-full text-sm text-neutral-500 hover:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    >
                      <span class="sr-only">Open user menu</span>
                      <CircleUser :size="28" />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem
                        v-for="item in userNavigation"
                        :key="item.name"
                        v-slot="{ active }"
                      >
                        <PrimaryButton
                          :title="item.name"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full text-start',
                          ]"
                          @click="item.action"
                        >
                          {{ item.name }}
                        </PrimaryButton>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel class="lg:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-indigo-700 text-white'
                  : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                'block rounded-md py-2 px-3 text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</DisclosureButton
            >
          </div>
          <div class="border-t border-indigo-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <CircleUser :size="28" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-black">
                  {{ user.name }}
                </div>
                <div class="text-sm font-medium text-indigo-500">
                  {{ user.email }}
                </div>
              </div>
              <button
                type="button"
                class="ml-auto flex-shrink-0 rounded-full p-1 text-neutral-500 hover:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                <span class="sr-only">View notifications</span>
                <Bell :size="24" />
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                as="a"
                @click="item.action"
                class="block rounded-md px-3 py-2 text-base font-medium text-neutral-500 hover:bg-indigo-500 hover:bg-opacity-75 cursor-pointer hover:text-neutral-100"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-neutral-100">
            Processos
          </h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <ProcessesTable />
      </div>
    </main>
  </div>
</template>
