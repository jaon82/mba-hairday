import { scheduleCancel } from "../../services/schedule-cancel";
import { schedulesDay } from "./load";

const periods = document.querySelectorAll(".period");
//Gerar o evento de click para cada lista (manhã, tarde ou noite)
periods.forEach((period) => {
  //Capturar o evento de click na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      //Obter a li pai do elemento clicado
      const item = event.target.closest("li");
      //Pegar o id do agendamento a ser removido
      const { id } = item.dataset;
      //Confirmar que o id foi selecionado
      if (id) {
        //Confirmar que o usuário quer cancelar o agendamento
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        );
        if (isConfirm) {
          //Fazer a requisição na API para cancelar o agendamento
          await scheduleCancel(id);
          //Recarregar os agendamentos
          schedulesDay();
        }
      }
    }
  });
});
