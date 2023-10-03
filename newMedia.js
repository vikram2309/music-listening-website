document.querySelector(".country_selection_cover").style.display="none";
document.querySelector(".task_data_cover").style.display="none";
document.querySelector(".city_data_cover").style.display="none";
document.querySelector(".coming_soon_cover").style.display="none";
document.querySelector(".upload_file_container").style.display = "none";
document.querySelector(".type4_container_cover").style.display = "none";
document.querySelector(".not_enough_money_cover").style.display = "none";

document.querySelector(".coupon_code_div").style.display = "none";
document.querySelector("#loader").style.display = "block";
var current_user = JSON.parse(window.localStorage.getItem("currentUser"));
var phoneNumber = window.localStorage.getItem("phone_no");
var current_userID = "C3qM31Fp1cQevJj9hiEa8bV6opZ2";
current_userID = current_user.uid;
var current_username;
function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}
var TripId=getParameter("bootcampId")
firebase.firestore().collection("users").where("phone_no", "==", phoneNumber).get().then((doc) => {
    var name = doc.docs[0].data().name;
    current_username = name;
    user_pic = doc.docs[0].data().user_photo;
    document.querySelector("#userdpMain").innerHTML +=
      doc.docs[0].data().user_photo != "null" && doc.docs[0].data().user_photo
        ? ` <div class="card__border2">
       <img src=${
         doc.docs[0].data().user_photo
       } alt="card image" class="card__img" />
      </div>`
        : ` <div class="card__border2">
     <span alt="card image" class="card__img">${
       doc.docs[0].data().name ? doc.docs[0].data().name.split("")[0] : "U"
     }</span></div>`;
    
  });
//Type4VirtualFieldTrip170523
var already_enrolled=0,already_enrolled_data;
firebase.firestore().collection(`zerseInternships/${TripId}/users`).where("userId", "==", current_userID).get().then((doc) => {
  document.querySelector("#loader").style.display = "none";
  if (doc.docs.length == 0) {
    already_enrolled = 0;
    console.log("no data");
    document.querySelector("#NewCountry_btn").style.display="none";
  } else {
    for (var i = 0; i < doc.docs.length; i++) {
      already_enrolled_data=doc.docs[i].data().location;
      console.log(already_enrolled_data);
      var selected_country,country_data=[];
      for(var j=0;j<already_enrolled_data.length;j++) {
         if(already_enrolled_data[j].status==0)  {
           selected_country=already_enrolled_data[j].documentId
          }

        }
        already_enrolled=1;
        document.querySelector("#start_initial_btn").style.display="none";

        var course_startTime;
        firebase.firestore().collection(`zerseInternships/${TripId}/users`).doc(current_userID).get().then(doc2 => {
          course_startTime=doc2.data().startTime;
        })
        if(selected_country) {
        firebase.firestore().collection(`zerseInternships/${TripId}/data`).doc(selected_country).get().then(doc2 => {
        country_data=doc2.data()?.taskmap;
        console.log(country_data);
        document.querySelector("#book_name").innerHTML=`<h1 style="text-align:center">${doc2.data().name}</h1>`
        document.querySelector(".trip_table").innerHTML='';
         country_data?.forEach((cntry_data,i) => {
          document.querySelector(".trip_table").innerHTML+=
             `
             <div class="trip_cities_row" id=${cntry_data.taskId}>
             <p>${i+1}</p>
             <h5>${cntry_data.name}</h5>
            </div>
             `
         })
        
         firebase.firestore().collection("zerseInternships").doc(TripId).get().then(doc => {
           trip_data=doc.data();
         })
         var cities_array=document.querySelectorAll(".trip_cities_row");
         var task_id;
         var trip_data=[];
         var task_type;
        for(var e of cities_array) {
          e.addEventListener("click",function() {
              
              for(var i=0;i<country_data.length;i++)
              {
                  if(country_data[i].taskId==this.id) {
                     task_id=country_data[i].taskId;
                     console.log(task_id);
                     var number_day;
                     task_type=country_data[i].type;
                     for(var j=0;j<trip_data.tasks.length;j++) {
                      if(trip_data.tasks[j].taskId==task_id) {
                        
                          document.querySelector(".task_data_div").innerHTML+=trip_data.tasks[j].about;
                          
                          number_day=j+1;
                      }
                    }
                    
                    var nextTime=course_startTime+(number_day+1)*24*60*60*1000
                    var prevTime=course_startTime+(number_day-1)*24*60*60*1000
                    
                     if(new Date().getTime()>=prevTime) {
                      document.querySelector(".task_data_cover").style.display="flex";
                      document.querySelector(".task_data_cover").style.opacity="1";
                      document.querySelector("#fun_facts_div").innerHTML=country_data[i].funfacts;
                      document.querySelector("#city_details").innerHTML=country_data[i].details;
                      document.querySelector("#city_name").innerHTML=`${country_data[i].name}, ${selected_country}`;
                      var sliderImages = country_data[i].photos;
                        
                          // Generate the HTML/CSS slider
                          var sliderContainer = document.querySelector('.slider-container-custom');
                          var sliderHtml = '';
                          sliderContainer.innerHTML = '';

                          for (var j = 0; j < sliderImages.length; j++) {
                            var imageUrl = sliderImages[j];
                            sliderHtml += '<div class="slide"><img src="' + imageUrl + '" alt="Slider Image"></div>';
                          }

                          sliderContainer.innerHTML = sliderHtml;
                          setTimeout(function() {
                            $('.slider-container-custom').slick({
                              dots: true,
                              infinite: true,
                              cssEase: 'linear',
                              swipe: false,
                              autoplay:true,
                              autoplaySpeed: 2000,
                              slidesToShow: 1,
                              adaptiveHeight: true
                            });
                          }, 500); 

                          
                          var sliderVideo = country_data[i].video;
                        
                          // Generate the HTML/CSS slider
                          var sliderContainerVideo = document.querySelector('.slider-container-video');
                          var sliderHtmlVideo = '';
                          sliderContainerVideo.innerHTML = '';

                          for (var j = 0; j < sliderVideo.length; j++) {
                            var imageUrl = sliderVideo[j];
                            sliderHtmlVideo += `<div class="slide">  <iframe src=https://www.youtube.com/embed/${country_data[i].video[j]} class="video_city" width="420" height="345"></iframe></div>`;
                          }

                          sliderContainerVideo.innerHTML = sliderHtmlVideo;
                          setTimeout(function() {
                            $('.slider-container-video').slick({
                              dots: true,
                              infinite: true,
                              cssEase: 'linear',
                              swipe: false,
                              autoplay:true,
                              autoplaySpeed: 2000,
                              slidesToShow: 1,
                              adaptiveHeight: true
                            });
                          }, 500); 
                     }
                     else {
                      document.querySelector(".coming_soon_cover").style.display="flex";
                      document.querySelector(".coming_soon_cover").style.opacity="1";
                     }
                  }
              }
              
      console.log(task_type);
    
      if(task_type==1) {
        document.querySelector("#city_data_btn").addEventListener("click",function() {
          window.location.href = `../about.html?TripId=${TripId}&taskId=${task_id}`
        })
      }
      else if(task_type==7) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/WordMaker/Sets/${course_data.tasks[i].taskDocumentId}/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              timeleft: 300,
              timetaken: 0,
              wordscount: 0,
              wordsdone: ""
            })
              .then(() => {
                window.location.href = `../WordMaker.html?setid=${taskDocumentId}&userid=${current_userID}&courseId=${TripId}&taskId=${task_id}&status=1`;
              })
              
          }
          
        }
      }
      else if(task_type==8) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/WordSearch/Sets/${course_data.tasks[i].taskDocumentId}/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              timetaken: 0,
            })
              .then(() => {
                window.location.href = `../WordSearch.html?setid=${taskDocumentId}&userid=${current_userID}&courseId=${TripId}&taskId=${task_id}&status=1`;
              })
              
          }
        }
      }
      else if(task_type==11) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/TheCubes/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              score: []
            })
              .then(() => {
                window.location.href = `../RubixCube.html?userid=${current_userID}&courseId=${TripId}&taskId=${taskId}&status=1`;
              })
              
          }
        }
      }
      else if(task_type==12) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/TheFunMaz/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              score: []
            })
              .then(() => {
                window.location.href = `./MazeGame/MazeGame.html?userid=${current_userID}&courseId=${TripId}&taskId=${taskId}&status=1`;
              })
              
          }
        }
      }
      else if(task_type==13) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/FLIP/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              score: []
            })
              .then(() => {
                window.location.href = `../flipTheCards.html?userid=${current_userID}&courseId=${TripId}&taskId=${taskId}&status=1`;
              })
              
          }
        }
      }
      else if(task_type==14) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/Water Sort Puzzle/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              score: []
            })
              .then(() => {
                window.location.href = `../ColorSort.html?userid=${current_userID}&courseId=${TripId}&taskId=${taskId}&status=1`;
              })
              
          }
        }
      }
      else if(task_type==15) {
        for(var i=0;i<course_data.tasks.length;i++) {
          if (course_data.tasks[i].taskId == task_id) {
            const taskDocumentId = course_data.tasks[i].taskDocumentId;
            firebase.firestore().collection(`Games/Cub'n'Pup/users`).doc(current_userID).set({
              userid: current_userID,
              name: current_username,
              status: 1,
              timeInMills: new Date().getTime(),
              current_level: 1
            })
              .then(() => {
                window.location.href = `../CubPup.html?userid=${current_userID}&courseId=${TripId}&taskId=${taskId}&status=1`;
              })
              
          }
        }
      }
      else if (task_type == 2) {
        document.querySelector("#city_data_btn").addEventListener("click",function() {
        var uploaded_files_array=[];
        document.querySelector(".upload_file_container").style.display = "flex";
        document.querySelector(".upload_file_container").style.opacity ="1";
        firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).get().then((doc) => {
          for(var i=0;i<doc.docs.length;i++) {
            var task_data=doc.docs[i].data().files;
            for(var j=0;j<task_data.length;j++)
            {
              uploaded_files_array.push({name: task_data[j].name,file: task_data[j].path });
            }
         }
         console.log(uploaded_files_array);
         for(var k=0;k<uploaded_files_array.length;k++)
         {
           document.querySelector(".already_uploaded_files_container").innerHTML+=`<div class="type3_card">
           <div>
           <img src="./assets/file.png">
           <h3>${uploaded_files_array[k].name}</h3>
           </div>
           <div>
             <span class="download_icon"><i class="fa fa-download" aria-hidden="true"></i></span>
             <span class="delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></span>
           </div>
           </div>
           `
         }
         var download_icon=document.querySelectorAll(".download_icon");
         for(var element of download_icon) {
          
           element.addEventListener("click",function() {
             var fileIndex = Array.from(download_icon).indexOf(this);
             var filePath = uploaded_files_array[fileIndex].file;
             var fileName = uploaded_files_array[fileIndex].name;
             
             var link = document.createElement("a");
             link.href = filePath;
             link.download = fileName;
             link.target = "_blank";
             link.click();
           })
         }
         var delete_icon = document.querySelectorAll(".delete_icon");
        for (var i = 0; i < delete_icon.length; i++) {
          delete_icon[i].addEventListener("click", function() {
            var fileIndex = Array.from(delete_icon).indexOf(this);
            var filePath = uploaded_files_array[fileIndex].file;

            // Find the document that contains the file in the locationAnswer subcollection
            firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).where("type", "==", 2).where("files", "array-contains", { path: filePath }).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var docId = doc.id;

                  // Remove the file from the files array in the document
                  var updatedFiles = doc.data().files.filter((file) => file.path !== filePath);

                  // Update the document with the updated files array
                  firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).doc(docId).update({ files: updatedFiles }).then(() => {
                      // Remove the file from the uploaded_files_array
                      uploaded_files_array.splice(fileIndex, 1);

                      // Remove the corresponding element from the already_uploaded_files_container
                      var fileElement = this.closest(".type3_card");
                      fileElement.remove();

                      console.log("File deleted successfully");
                    })
                    .catch((error) => {
                      console.error("Error deleting file:", error);
                    });
                });
              })
              .catch((error) => {
                console.error("Error finding document:", error);
              });
          });
        }

        document.querySelector("#task_file_input").addEventListener("change", (event) => {
          document.querySelector("#submit_task_file_btn").addEventListener("click", function () {
            var reader = new FileReader();
            var file;
            if (event.target.files[0]) {
              reader.readAsDataURL(event.target.files[0]);
            }
            reader.onloadend = function () {
              var time = new Date();
              var file_name=event.target.files[0].name
              document.querySelector(".already_uploaded_files_container").innerHTML+=`<div class="type3_card">
                <img src="./assets/file.png">
                <h3>${file_name}</h3>
                </div>
               `
              const metadata = {
                contentType: event.target.files[0].type,
              };
              var storageRef = firebase.storage().ref().child(`users/${event.target.files[0].name}`, metadata);
              file = reader.result;
              storageRef.putString(file, "data_url").then((snapshot) => {
                  event.target.value = "";
                  snapshot.ref.getDownloadURL().then((downloadURL) => {
                    var nowTime = new Date();
                    console.log(downloadURL);
                    
                        var files_obj = {
                          name: file_name,
                          type: 11,
                          path: downloadURL,
                        };
                        
                        firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).doc().set({
                          answer: null,
                          taskId: task_id,
                          currentProgress: 100,
                          maxPorgress: 100,
                          feedback: [],
                          fieldType: "country",
                          type: 4,
                          title: "",
                          location: selected_country,
                          files: [files_obj]
                      })     
                      
                   
                    .then((updated)=>{
                      console.log("sent");
                      alert("file uploaded successfully")
                      document.querySelector("#task_file_input").value="";
                    })
                  });
                });
            };
            document.querySelector(".upload_file_container").style.display = "none";
          });
          });
        });
        })


      }
      else if(task_type==3) {
        document.querySelector("#city_data_btn").addEventListener("click",function() {
          document.querySelector(".type3_dialog_cover").style.display = "flex";
          document.querySelector(".type3_dialog_cover").style.opacity = "1";
          document.querySelector("#referal_code").innerHTML=invite_code;
          document.querySelector("#referal_counts").innerHTML=invited;
        })
      }
      else if(task_type == 4) {
        document.querySelector("#city_data_btn").addEventListener("click",function() {
        var uploaded_files_array=[];
        document.querySelector(".type4_container_cover").style.display = "flex";
        document.querySelector(".type4_container_cover").style.opacity = "1";

        document.querySelector("#type4_response_btn").addEventListener("click",function() {
          window.location.href = `../about.html?TripId=${TripId}&taskId=${taskId}`
        })
        document.querySelector("#type4_file_btn").addEventListener("click",function() {
          document.querySelector(".type4_container_cover").style.display = "none";
          document.querySelector(".upload_file_container").style.display = "flex";
          document.querySelector(".upload_file_container").style.opacity ="1";
          document.querySelector(".already_uploaded_files_container").innerHTML="";
          firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).get().then((doc) => {
            for(var i=0;i<doc.docs.length;i++) {
               var task_data=doc.docs[i].data().files;
               for(var j=0;j<task_data.length;j++)
               {
                 uploaded_files_array.push({name: task_data[j].name,file: task_data[j].path });
               }
            }
            console.log(uploaded_files_array);
            for(var k=0;k<uploaded_files_array.length;k++)
            {
              document.querySelector(".already_uploaded_files_container").innerHTML+=`<div class="type3_card">
              <div>
              <img src="./assets/file.png">
              <h3>${uploaded_files_array[k].name}</h3>
              </div>
              <div>
                <span class="download_icon"><i class="fa fa-download" aria-hidden="true"></i></span>
                <span class="delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></span>
              </div>
              </div>
              `
            }
            var download_icon=document.querySelectorAll(".download_icon");
            for(var element of download_icon) {
              
              element.addEventListener("click",function() {
                var fileIndex = Array.from(download_icon).indexOf(this);
                var filePath = uploaded_files_array[fileIndex].file;
                var fileName = uploaded_files_array[fileIndex].name;
                
                var link = document.createElement("a");
                link.href = filePath;
                link.download = fileName;
                link.target = "_blank";
                link.click();
              })
            }
            var delete_icon = document.querySelectorAll(".delete_icon");
        for (var i = 0; i < delete_icon.length; i++) {
          delete_icon[i].addEventListener("click", function() {
            var fileIndex = Array.from(delete_icon).indexOf(this);
            var filePath = uploaded_files_array[fileIndex].file;

            // Find the document that contains the file in the locationAnswer subcollection
            firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).where("type", "==", 4).where("files", "array-contains", { path: filePath }).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var docId = doc.id;

                  // Remove the file from the files array in the document
                  var updatedFiles = doc.data().files.filter((file) => file.path !== filePath);

                  // Update the document with the updated files array
                  firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).doc(docId).update({ files: updatedFiles }).then(() => {
                      // Remove the file from the uploaded_files_array
                      uploaded_files_array.splice(fileIndex, 1);

                      // Remove the corresponding element from the already_uploaded_files_container
                      var fileElement = this.closest(".type3_card");
                      fileElement.remove();

                      console.log("File deleted successfully");
                    })
                    .catch((error) => {
                      console.error("Error deleting file:", error);
                    });
                });
              })
              .catch((error) => {
                console.error("Error finding document:", error);
              });
          });
        }
          document.querySelector("#task_file_input").addEventListener("change", (event) => {
            document.querySelector("#submit_task_file_btn").addEventListener("click", function () {
              var reader = new FileReader();
              var file;
              if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
              }
              reader.onloadend = function () {
                var time = new Date();
                var file_name=event.target.files[0].name
                document.querySelector(".already_uploaded_files_container").innerHTML+=`<div class="type3_card">
                  <img src="./assets/file.png">
                  <h3>${file_name}</h3>
                  </div>
                 `
                const metadata = {
                  contentType: event.target.files[0].type,
                };
                var storageRef = firebase.storage().ref().child(`users/${event.target.files[0].name}`, metadata);
                file = reader.result;
                storageRef.putString(file, "data_url").then((snapshot) => {
                    event.target.value = "";
                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                      var nowTime = new Date();
                      console.log(downloadURL);
                      
                          var files_obj = {
                            name: file_name,
                            type: 11,
                            path: downloadURL,
                          };
                          
                          firebase.firestore().collection(`zerseInternships/${TripId}/users/${current_userID}/locationAnswer`).doc().set({
                            answer: null,
                            taskId: task_id,
                            currentProgress: 100,
                            maxPorgress: 100,
                            feedback: [],
                            fieldType: "country",
                            type: 4,
                            title: "",
                            location: selected_country,
                            files: [files_obj]
                        })     
                        
                     
                      .then((updated)=>{
                        console.log("sent");
                        alert("file uploaded successfully")
                        document.querySelector("#task_file_input").value="";
                      })
                    });
                  });
              };
              document.querySelector(".upload_file_container").style.display = "none";
            });
            });

          });

        })
      })
      }
     })
  }
      })
     }
    }
  }
});



firebase.firestore().collection("zerseInternships").doc(TripId).get().then(doc => {
    var trip_data=doc.data();
    var pricing=trip_data.pricing;
    document.querySelector("#trip_details").innerHTML=trip_data.details;
    document.querySelector("#trip_cost").innerHTML=`Cost: ${trip_data.jamsMoney}`;
    var trip_duration=trip_data.duration/24;
    var sliderImages = trip_data.sliderUrl;

    // Generate the HTML/CSS slider
    var sliderContainer = document.querySelector('.slider-container');
    var sliderHtml = '';

    for (var i = 0; i < sliderImages.length; i++) {
      var imageUrl = sliderImages[i];
      sliderHtml += '<div class="slide"><img src="' + imageUrl + '" alt="Slider Image"></div>';
    }

    sliderContainer.innerHTML = sliderHtml;
    $('.slider-container').slick({
      dots: true,
      infinite: true,
      cssEase: 'linear',
      swipe: false,
    });
    document.querySelector("#trip_duration").innerHTML=`Duration: ${trip_duration} days`;
    if(already_enrolled==0) {
    for(var i=0;i<trip_duration;i++) {
        document.querySelector(".trip_table").innerHTML+=
        `
        <div class="trip_table_row">
        <h5>Day ${i+1}</h5>
       </div>
        
        `
    }
    
    document.querySelector("#start_initial_btn").addEventListener("click",function() {
        document.querySelector(".country_selection_cover").style.display="flex";
        document.querySelector(".country_selection_cover").style.opacity="1";

        for(var i=0;i<trip_data.location.length;i++) {
          document.querySelector(".countries_list_div").innerHTML+=`
          <div id=${trip_data.location[i].documentId.split(" ").join('_')} class="country_name_div">
          <div>
          <img src=${trip_data.location[i].imageUrl?  trip_data.location[i].imageUrl : './assets/dummyImageSelect.jpg'} />
          </div>
          <div>
           <h3>${trip_data.location[i].name}</h3>
           <p>${trip_data.location[i]?.details ? trip_data.location[i].details.split(".")[0] : ""}</p>
           <h6>${trip_data.location[i]?.rating ? trip_data.location[i].rating: ""}</h6>
          </div>
         </div>
          `
      }

      firebase.firestore().collection(`zerseInternships/${TripId}/users`).doc(current_userID).get().then(doc2 => {
        course_startTime=doc2.data()?.startTime;
        for(var i=0;i<doc2.data().location.length;i++) {
          enrolled_countries.push(doc2.data().location[i].name);
        }
      })
var cards_array=document.querySelectorAll(".country_name_div");
  for(var element of cards_array) {
    element.classList.remove("selected_country")
    element.addEventListener("click",function() {
      if (selected_country !== null) {
        // If a country is already selected, remove the "selected_country" class from it
        var selectedElement = document.getElementById(selected_country);
        if (selectedElement) {
          selectedElement.classList.remove("selected_country");
        }
      }
  
        this.classList.add("selected_country");
        selected_country=this.id;
        console.log(selected_country);
        if(selected_country=="United_States") {
          selected_country="United States"
         }
            firebase.firestore().collection(`zerseInternships/${TripId}/data`).doc(selected_country).get().then(doc2 => {
                 country_data=doc2.data().taskmap;
            })
    })
   }
    })

  }
  var country_data=[];
  var selected_country;
  var enrolled_countries=[];
  var ifAlreadyEnrolled=0;  
  var course_startTime;
  document.querySelector("#NewCountry_btn").addEventListener("click",function() {
    document.querySelector(".country_selection_cover").style.display="flex";
    document.querySelector(".country_selection_cover").style.opacity="1";
    for(var i=0;i<trip_data.location.length;i++) {
      document.querySelector(".countries_list_div").innerHTML+=`
      <div id=${trip_data.location[i].documentId.split(" ").join('_')} class="country_name_div">
              <div>
              <img src=${trip_data.location[i].imageUrl?  trip_data.location[i].imageUrl : './assets/dummyImageSelect.jpg'} />
              </div>
              <div>
               <h3>${trip_data.location[i].name}</h3>
               <p>${trip_data.location[i]?.details ? trip_data.location[i].details.split(".")[0] : ""}</p>
               <h6>${trip_data.location[i]?.rating ? trip_data.location[i].rating: ""}</h6>
              </div>
             </div>
             `
           }
        firebase.firestore().collection(`zerseInternships/${TripId}/users`).doc(current_userID).get().then(doc2 => {
          course_startTime=doc2.data()?.startTime;
          enrolled_countries=doc2.data().location;
        })
        
  var cards_array=document.querySelectorAll(".country_name_div");
    for(var element of cards_array) {
      element.classList.remove("selected_country")
      element.addEventListener("click",async function() {
        if (selected_country !== null) {
          // If a country is already selected, remove the "selected_country" class from it
          var selectedElement = document.getElementById(selected_country);
          if (selectedElement) {
            selectedElement.classList.remove("selected_country");
          }
        }
    
        this.classList.add("selected_country");
               selected_country=this.id;
               if(selected_country=="United_States") {
                selected_country="United States"
               }
              console.log(selected_country);
              console.log(enrolled_countries);
              var country_already_present=0;
              enrolled_countries.forEach(country => {
                if(country.name==selected_country) {
                  country_already_present=1;
                }
              })
              if(country_already_present==1){
                enrolled_countries.forEach(country => {
                  if(country.name==selected_country) {
                    country.status=0;
                  }
                  else {
                    country.status=1;
                  }
                })
                console.log(enrolled_countries);
                await firebase.firestore().collection(`zerseInternships/${TripId}/users`).doc(current_userID).update({
                  location: enrolled_countries
                })
  
                window.location.href= `./Bootcamps.html?bootcampId=${TripId}`
              }
              
             
      })
  }
 
})
 
    var JamsMoney=doc.data().jamsMoney;
    if(pricing?.[0].segmentName=="INVITE_CODE_DISCOUNT" && course_type=="3") {
      document.querySelector(".coupon_code_div").style.display = "block";

      document.querySelector("#coupon_code").addEventListener("change",function() {
        let coupon_code=document.querySelector("#coupon_code").value;
        if(coupon_code.length>5) {
          alert("Coupon Code can only be 5 letters long.")
        }
      })
    }
    
    document.querySelector("#register_btn").addEventListener("click",function() {
      if(enrolled_countries.includes(selected_country)) {
        ifAlreadyEnrolled==1;
      }
      else {
        ifAlreadyEnrolled==0;
      }
      console.log(ifAlreadyEnrolled);
      firebase.firestore().collection(`JamsMoney`).doc(current_userID).get().then(doc => {
        if(!doc.exists) {
          // Document does not exist, create it first
          firebase.firestore().collection(`JamsMoney`).doc(current_userID).set({
            balance: 0, // set initial balance to 0 or any value you want
            name: current_username,
            userId: current_userID
          }).then(() => {
            // Document created successfully, now run the rest of the code
            console.log("document created successfully");
            updateBalance();
          }).catch(error => {
            console.error("Error creating document:", error);
          });
        }
        else {
          // Document already exists, run the rest of the code
          console.log("document already exists");
          updateBalance();
          
        }
      }).catch(error => {
        console.error("Error getting document:", error);
      });
      var tasks = [];
      for (var i = 0; i < trip_data.tasks.length; i++) {
        var obj = {
          currentProgress: 0,
          maxProgress: 100,
          title: trip_data.tasks[i].title,
          type: trip_data.tasks[i].type,
          taskId: trip_data.tasks[i].taskId,
        };
        tasks.push(obj);
      }
      var locationObj= {
        startDate: new Date().getTime(),
        status :0,
        type: "bootcamp",
        name: selected_country,
        documentId : selected_country 
      }
      console.log(locationObj);
      var current_balance=0;
      function updateBalance() {
        console.log(JamsMoney);
        firebase.firestore().collection(`JamsMoney`).doc(current_userID).get().then(doc => {
              current_balance=doc.data().balance;
              let coupon_code=document.querySelector("#coupon_code").value;
              coupon_code=coupon_code.toUpperCase();  
              console.log(coupon_code)
              if(coupon_code && pricing[0].segmentName=="INVITE_CODE_DISCOUNT") {
                firebase.firestore().collection("users").where("invitationCode","==",coupon_code).get().then(doc2 => {
                  if(doc2.docs[0].data().user_id) {
                    const referenceUserId=doc2.docs[0].data().user_id;
                    console.log(referenceUserId)
                      const discount=JamsMoney*(pricing[0].discount)/100;
                      JamsMoney-=discount;

                      firebase.firestore().collection("AppliedCodes").doc().set({
                        code: coupon_code,
                        discountInPercentage: pricing[0].discount,
                        documentId :"",
                        programId: TripId,
                        referenceUserId: referenceUserId,
                        userid:  current_userID
                      }).then((docRef) => {
                        const documentId = docRef.id;
                        firebase.firestore().collection(`AppliedCodes`).doc(documentId).update({
                          documentId: documentId
                        });
                      })
                      firebase.firestore().collection(`JamsMoney`).doc(referenceUserId).update({
                        balance: doc.data().balance+discount,
                      })
                      firebase.firestore().collection(`JamsMoney/${referenceUserId}/transactions`).doc().set({
                        amount: discount,
                        title: "Commission For Course Sale",
                        transactionType: "Credit",
                        startTime: new Date().getTime(),
                        type: "82",
                        setId: TripId,
                        documentId: ""
                      }).then((docRef) => {
                        const documentId = docRef.id;
                        firebase.firestore().collection(`JamsMoney/${current_userID}/transactions`).doc(documentId).update({
                          documentId: documentId
                        });
                      })
                    }
                })
              }

              if(doc.data().balance< -50000) 
              {
                alert("You have exceeded the limit of Learn and Earn feature.")
              } else {
              if(doc.data().balance<JamsMoney && doc.data().balance > -50000) {
                document.querySelector(".not_enough_money_cover").style.display="flex";
                document.querySelector(".not_enough_money_cover").style.opacity="1";
                 document.querySelector("#not_enough_money_submitBtn").addEventListener("click",function() {
                  document.querySelector("#loader").style.display="block";
                     CompleteRegisterationType4();
                     document.querySelector(".not_enough_money_cover").style.display="none";
                 })
              }
              else {
                CompleteRegisterationType4();
              }
            }
            })
      }
          
          
           async function CompleteRegisterationType4() {
           
            
            const userDocRef = firebase.firestore().collection(`zerseInternships/${TripId}/users`).doc(current_userID);

            // Check if the document exists
            await userDocRef.get().then((docSnapshot) => {
              if (docSnapshot.exists) {
                // Document exists, update it
                userDocRef.update({
                  location: firebase.firestore.FieldValue.arrayUnion(locationObj),
                  // Other fields to update
                })
                .then(() => {
                  console.log('Document updated successfully!');
                })
                .catch((error) => {
                  console.error('Error updating document: ', error);
                });
              } else {
                // Document doesn't exist, create it
                userDocRef.set({
                  location: [locationObj], // Initialize the array with locationObj
                  name: "Virtual Bootcamps",
                  tasks: tasks,
                  startTime: new Date().getTime(),
                  userId: current_userID,
                  userName: current_username,
                })
                .then(() => {
                  console.log('Document created successfully!');
                })
                .catch((error) => {
                  console.error('Error creating document: ', error);
                });
              }
            });

            
          await firebase.firestore().collection("zerseInternships").doc(TripId).update({
            users: firebase.firestore.FieldValue.arrayUnion(current_userID)
           }) 

           let newBalance=current_balance - JamsMoney;
            
           await firebase.firestore().collection(`JamsMoney`).doc(current_userID).update({
             balance: Number(newBalance),
           })
           const transactionRef = firebase.firestore().collection(`JamsMoney/${current_userID}/transactions`).doc();
           const documentId = transactionRef.id;
           
           await transactionRef.set({
             amount: JamsMoney,
             title: "Virtual Bootcamps",
             transactionType: "Debit",
             startTime: new Date().getTime(),
             documentId: ""
           });
           
           // ... Update balance here ...
           
           await transactionRef.update({
             documentId: documentId
           });

           window.location.href= `./Bootcamps.html?bootcampId=${TripId}`
          }
      
    })

   document.querySelector("#task_data_btn").addEventListener("click",function() {
    document.querySelector(".task_data_cover").style.display="none";
    document.querySelector(".city_data_cover").style.display="flex";
    document.querySelector(".city_data_cover").style.opacity="1";
   })
   
})



document.querySelector("#country_selection_cover_close_btn").addEventListener("click",function() {
    document.querySelector(".country_selection_cover").style.display="none";
    document.querySelector(".countries_list_div").innerHTML='';
  })
document.querySelector("#task_data_cover_close_btn").addEventListener("click",function() {
    document.querySelector(".task_data_cover").style.display="none";
    document.querySelector(".task_data_div").innerHTML='';
  })
document.querySelector("#city_data_cover_close_btn").addEventListener("click",function() {
    document.querySelector(".city_data_cover").style.display="none";
    //document.querySelector(".task_data_div").innerHTML='';
    $('.slider-container-custom').slick('unslick');
    $('.slider-container-video').slick('unslick');
  })
document.querySelector("#coming_soon_cover_close_btn").addEventListener("click",function() {
    document.querySelector(".coming_soon_cover").style.display="none";
    
  })

  const closeDialog =(containerClass) => {
    document.querySelector(`.${containerClass}`).style.display="none";
  }
  document.querySelector("#type4_container_close_button").addEventListener("click", function () {
    closeDialog("type4_container_cover");
  });
  

  document.querySelector("#upload_file_container_close_button").addEventListener("click", function () {
    document.querySelector(".upload_file_container").style.display = "none";
    document.querySelector(".already_uploaded_files_container").innerHTML='';
  });
