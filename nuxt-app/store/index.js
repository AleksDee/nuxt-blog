import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      },
      addPost(state, post) {
        debugger;
        state.loadedPost.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPost.findIndex(post => {
          return post.id === editedPost.id;
        });
        state.loadedPost[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get("https://nuxt-blog-54f59.firebaseio.com/posts.json")
          .then(res => {
            debugger;
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
            console.log(res);
          })
          .catch(e => {
            context.error(e);
          });
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return axios
          .post(
            process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token,
            createdPost
          )
          .then(res => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: res.data.name
            });
          })
          .catch(e => {
            console.log(e);
          });
      },
      editPost(vuexContext, post) {
        return axios
          .put(
            "https://nuxt-blog-54f59.firebaseio.com/posts/" +
              //   this.$route.params.postId +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            editedPost
          )
          .then(res => {
            // this.$router.push("/admin");
            vuexContext.commit("editedPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      setPosts(context, posts) {
        context.commit("setPosts", posts);
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + +result.expiresIn * 1000
            );
            Cookie.set("jwt", result.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + +result.expiresIn * 1000
            );
            // vuexContext.dispatch("setLogoutTimer", result.expiresIn * 1000);
            console.log(result);
            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "Authenticated!"
            });
          })
          .catch(e => console.log(e));
      },
      // setLogoutTimer(vuexContext, duration) {
      //   setTimeout(() => {
      //     vuexContext.commit("clearToken");
      //   }, duration);
      // },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie.split(";").find(c => {
            return c.trim().startsWith("jwt=");
          });
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(d => d.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        } else {
          token = null;
          expirationDate = null;
        }

        if (new Date().getTime() > expirationDate || !token) {
          console.log("no token or invalid token");
          // vuexContext.commit("clearToken");
          vuexContext.dispatch("logout");
          return;
        }

        // vuexContext.dispatch(
        //   "setLogoutTimer",
        //   expirationDate - new Date().getTime()
        // );
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
