const form = document.querySelector("#form");
const userInput = document.querySelector("#user_input");
const dictionaryTitle = document.querySelector("#dictionary_word");
const phoentic = document.querySelector("#dictionary_phonetic");
const dictionary_sound = document.querySelector("#audio");
const playButton = document.querySelector("#play_button");
const meaningList = document.querySelectorAll("#meaning_item");
const verb = document.querySelector("#part_of_speech_verb");
const noun = document.querySelector("#part_of_speech_noun");
const synonyms_title = document.querySelector(".synon");
console.log(synonyms_title)
const link_id = document.querySelector("#source_id");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput.value}`;
  const fetchAPI = await fetch(api);
  const responseData = await fetchAPI.json();

  //dictionary title
  responseData.map((currentValue, index) => {
    dictionaryTitle.innerHTML = currentValue.word;
    phoentic.textContent = currentValue.phonetic;
  });

  //dicitonary_sound

  const audiosound = false;
  responseData.map((currentValue, index) => {
    currentValue.phonetics.map((items, index) => {
      playButton.addEventListener("click", () => {
        if (!audiosound && items.audio === "") {
          dictionary_sound.src = "";
          return null;
        } else {
          dictionary_sound.src = items.audio;
          dictionary_sound.play();
        }
      });
    });
  });

  //meaning_list
  const arrayMeaning = Array.from(meaningList);
  responseData.map((items, index) => {
    items.meanings.map((items, index) => {
      items.definitions.map((defi, defi_index) => {
        arrayMeaning.map((items, index) => {
          if (defi_index === index) {
            items.textContent = defi.definition;
          }
        });
      });
    });
  });

  //synonyms
  responseData.map((items,index)=>{
     items.meanings.map((items,index)=>{
       items.synonyms.map(items=>{
         synonyms_title.innerText = items;
         console.log(synonyms_title);
       })
         
     })
  })
  responseData.map((items,index)=>{
     items.meanings.forEach((items,index)=>{
      if(noun.textContent === items.partOfSpeech ){
        noun.textContent = items.partOfSpeech;
       }
       else {
        verb.textContent = items.partOfSpeech;
       }
         
     })
  })

  responseData.map((items)=>{
     link_id.innerText =  items.sourceUrls[0];
      console.log(items);
  })

  //

});
