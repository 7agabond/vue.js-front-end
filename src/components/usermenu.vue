<template>
<div class="nav-loginmenu">
  <template v-if="!this.user">
    <router-link to="/signup" class="button-secondary dark">Sign up</router-link>
    <router-link to="/login" class="button-primary">Log in</router-link>
  </template>
  <template v-else>
    <router-link class="navlink" to="/upload">Upload</router-link>
    <div class="user-panel"
      @click="this.show=!this.show"
      v-bind:style="this.show?{'background-color':'var(--soft-black)'}:{}"
    >
      <img class = "nav-user-profile-picture" :src="`http://localhost:5000/api/user/`+this.user.username+`/picture`"/>
      <!-- <div class = "nav-user-profile-picture bi bi-person-fill"/> -->
      <span class="bi-caret-down-fill user-panel-carets" v-bind:style="{'color':'var(--light-gray)'}"></span>
      <panel v-if="this.show" style="position:absolute;top:100%;left:0; z-index:999;width:150px">
        <template v-slot:content>

          <div class = "usermenu">
            <router-link class="usermenu-button"
              :to="'/id/'+this.user.username">
              <span class="bi-person-fill usermenu-button-icon"></span>
              <span>Profile</span>
            </router-link>
            <button class ="usermenu-button" v-on:click="this.$store.dispatch('toggleTheme')">
              <span class="bi bi-palette usermenu-button-icon"></span>
              <span>Mode</span>
            </button>
            <button class ="usermenu-button" v-on:click="this.$store.dispatch('logOut')">
              <span class="bi bi-box-arrow-right usermenu-button-icon"></span>
              <span>Sign out</span>
            </button>
          </div>
        </template>
      </panel>
    </div>
  </template>
</div>
</template>

<script>

import {getUserByToken} from "@/axios/getters.js"

import panel from "@/components/panel.vue"

export default {
  name: 'usermenu',
  components:{ panel },
  data()
  {
    return {
      show:false,
      user:undefined,
    }
  },
  async created()
  {
    const r = await getUserByToken();
    if (r.status===200) this.user=r.values;
    else this.user=undefined;
  },
  watch:
  {
    async '$store.state.authJWT'(playlistSong)
    {
      const r = await getUserByToken();
      if (r.status===200) this.user=r.values;
      else this.user=undefined;
    }
  },
  mounted()
  {
    document.addEventListener('click', this.close);
  },
  beforeDestroy()
  {
    document.removeEventListener('click',this.close);
  },
  methods:
  {
    close(e)
    {
      if (!this.$el.contains(e.target)) this.show = false;
    }
  }
}
</script>

<style>

.usermenu
{
  display:flex;
  flex-direction: column;
  gap:3px;
}

.usermenu-button
{
  background:none;
  color:var(--text-color-primary);
  text-align: left;
  border:none;
  cursor:pointer;
  text-decoration: none;
  align-items: center;
  gap:10px;
  border-radius:10px;
  padding: 5px 5px 5px 5px;
}

.usermenu-button:hover
{
  background-color:var(--selected-item-background-color);
}

.usermenu-button-icon
{
  color:var(--accent-color);
  padding-right:5px;
}

.primary-text
{
  color:var(--text-color-primary);
  white-space: nowrap;
}

.nav-user-profile-picture
{
  height:44px;
  width:44px;
  flex-shrink: 0;
  border-radius: 50%;
  color:var(--light-gray);
  align-items: center;
  display:flex;
  justify-content:center;
  font-size:2em;
}

.nav-loginmenu
{
  display:flex;
  align-items:center;
  gap:10px;
  position:relative;
  height:100%;
  float:right;
}

.user-panel
{
  position:relative;
  display:flex;
  align-items: center;
  margin-left:auto;
  gap:10px;
  padding-left:10px;
  padding-right:10px;
  height:100%;
}

.user-panel:hover
{
  background-color:var(--soft-black);
}

</style>