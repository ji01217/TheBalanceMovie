<template>
  <div>
    <!-- <div class="cropped">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472"
        alt=""
      />
      
      <div class="header-title">{{ this.title }}</div>
    </div> -->
    <div class="header-title my-3">{{ this.title }}</div>
    
  </div>
</template>

<script>
export default {
  name: "SidebarHeader",
  props: {
    title: String,
  },
};
</script>

<style>
.cropped {
  height: 250px;
  overflow: hidden;
  position: relative;
}
.cropped img {
  width: 100%;
  height:100%;
  
  filter: brightness(50%);
}
.header-title {
  text-align: center;
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 30px;
  font-family: "Happiness-Sans-Title";
}
</style>