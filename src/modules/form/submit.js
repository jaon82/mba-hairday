import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new";

const form = document.querySelector("form");
const selectedDate = document.getElementById("date");
const clientName = document.getElementById("client");

const inputToday = dayjs(new Date()).format("YYYY-MM-DD");
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  event.preventDefault();
  try {
    //Recuperar o nome do cliente
    const name = clientName.value.trim();
    if (!name) {
      return alert("Informe o nome do cliente!");
    }
    //Recuperar o horário selecionado
    const hourSelected = document.querySelector(".hour-selected");
    if (!hourSelected) {
      return alert("Selecione a hora!");
    }
    const [hour] = hourSelected.innerText.split(":");
    const when = dayjs(selectedDate.value).add(hour, "hour");
    //Gerar ID do agendamento
    const id = new Date().getTime();
    await scheduleNew({
      id,
      name,
      when,
    });
  } catch (error) {
    alert("Não foi possível realizar o agendamento");
    console.log(error);
  }
};
