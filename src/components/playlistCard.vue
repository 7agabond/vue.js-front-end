<template>
    <div class = "playlistCard">
        <div class="playlist-cover-wrapper" v-on:click="$router.push($route.path+'/playlist/'+this.id)">
            <img class = "playlist-cover" v-if="cover" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="cover=false"/>
            <div class = "playlist-cover bi bi-music-note-list" v-else/>
            <div class = "playlist-cover-shade"></div>
            <button class="playlist-button round-button large bi bi-play-fill"></button>
        </div>
        <div class= "song-info">
            <div class ="song-info-name" v-on:click="$router.push($route.path+'/playlist/'+this.id)">{{this.playlist.name}}</div>
            <div class ="song-info-artist">
                <div v-for="(artist,index) in this.playlist.artists">
                    <router-link class="artistlink" v-if="artist.id"
                        :to="'/id/'+artist.id"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.playlist.artists.length">, </span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { getPlaylist } from "@/axios/getters.js"

export default
{
  name: 'playlistCard',
  props:
  {
    id: {type: Number, default:-1},
  },
  data()
  {
    return {
      playlist:
      {
      },
      cover:true
    }
  },
  async mounted()
  {
    this.playlist = await getPlaylist(this.id);
  }
}
</script>

<style>

.playlistCard
{
    display:flex;
    flex-direction: column;
    width:128px;
    flex-shrink: 0;
}

.playlist-cover-wrapper
{
    display:flex;
    border:2px solid var(--panel-border-color);
    border-radius:10px;
    flex-shrink: 0;
    width:100%;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    overflow:hidden;
    position:relative;
    justify-content: center;
    align-items: center;
}

.playlist-cover-shade
{
    position:absolute;
    background-color: black;
    width:100%;
    height:100%;
    opacity:0.0;
    transition: 0.2s all;
}

.playlist-cover
{
    width:100%;
    height:100%;
    background-color:var(--panel-border-color);
    color:var(--text-color-secondary);
    align-items: center;
    display:flex;
    justify-content:center;
    font-size:4em;
}

.playlist-cover-wrapper:hover .playlist-cover-shade
{
    opacity:0.4;
}

.playlist-button
{
    position:absolute;
    opacity:0.0;
    padding-top:20px;
    transition: 0.2s all;
    color:white;
}

.playlist-cover-wrapper:hover .playlist-button
{
    opacity:1.0;
    padding-top:0px;
}


</style>