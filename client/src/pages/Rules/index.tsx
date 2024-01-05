import { Header } from "../../components/Header";

export function Rules(){
    return (
        <>
            <Header/>
            <main>
                <div className="max-w-xl mx-auto">
                    <h1 className="text-2xl font-bold m-5 text-red text-center">Regras Gerais</h1>

                    <ul className="space-y-4 flex flex-col justify-center items-center">
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Um baralho poderá ter um mínimo de 12 e o máximo de 22 cartas
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Só será permitido um total de 3 cópias da mesma carta.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Cada jogador poderá ter no máximo 4 cartas na mão. Entretanto, efeitos de cartas podem causar mudanças nesse número.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Toda rodada os dois jogadores compram até ter 4 cartas na mão. Entretanto, efeitos de cartas podem causar mudanças nesse número.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Toda rodada ambos os jogadores colocam 3 cartas no campo de batalha, cartas não utilizadas voltam para a mão do dono. Cartas utilizadas vão para o fundo do baralho.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            A cada 3 rodadas os baralhos devem ser embaralhados e só assim o jogo pode continuar.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            O jogo se divide em 4 etapas, sendo elas: Etapa de compra → etapa de preparação → etapa de ação → Clímax.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Etapa de compra: é o momento em que todos os jogadores compram suas cartas da rodada.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Etapa de preparação: ocorre quando os jogadores estão colocando em campo suas cartas.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Etapa de ação: é o momento da rodada em que todos estão ativando suas cartas, efeitos e etc…
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            Clímax: é o momento final da rodada onde os jogadores, depois de tudo ativado, comparam os valores de ataque e defesa para poder calcular o dano da rodada. (na aba de “O combate” será explicado como fazer o cálculo de dano.)
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber text-white p-4 ">
                            O jogo termina quando a vida de um dos avatar chegar a zero.
                        </li>
                    </ul>
                    <h1 className="text-2xl font-bold m-5 text-red text-center">Regra de correntes</h1>
                    <ul className="space-y-4 flex flex-col justify-center items-center">
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber border-2 border-500 text-black p-4 rounded">
                            Um baralho poderá ter um mínimo de 12 e o máximo de 22 cartas
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber border-2 border-500 text-black p-4 rounded">
                            Corrente de efeito são criadas quando efeito de cartas são ativadas, somente cartas de “habilidade” e “habilidade única” podem responder a uma corrente.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-blue-cyber border-2 border-500 text-black p-4 rounded">
                            Os efeitos de correntes são empilhados em ordem de ativação e são resolvidas em ordem decrescente.
                        </li>
                    </ul>
                    <h1 className="text-2xl font-bold m-5 text-red text-center">Climax</h1>
                    <ul className="space-y-4 mb-5 flex flex-col justify-center items-center">
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            Todos os avatares possuem 35 pontos de vida.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            No primeiro turno a ordem de início seguirá a seguinte estrutura: Ofensivos &gt; moderados &gt; defensivos. 
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            Em caso de mesmo tipo, os jogadores deverão decidir, por meio de cara ou coroa, a ordem de início.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            Depois de selecionadas e postas as cartas no campo, o jogo terá a seguinte ordem, o jogador do turno ativa a primeira carta, depois, o segundo jogador, após o segundo jogador ativar sua carta, o próximo a ativar será o jogador dono do turno e assim por diante até todas as cartas terem sido utilizadas.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            Obrigatoriamente deve-se posicionar 3 cartas por turno, mas não é necessária a ativação de todas elas, assim voltando as não utilizadas para a mão.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            O “Clímax” começa quando os dois jogadores não tiverem mais cartas para ativar ou ambos concordarem em não ativar mais nenhuma carta.
                        </li>
                        <li className="cyber-tile-big hover:shadow-2xl hover:scale-105 transition bg-red-cyber border-2 border-500 text-white p-4 rounded">
                            O Cálculo de Dano: O cálculo é efetuado com base no ataque e defesa de cada carta, ou seja se o ataque for maior que a defesa do avatar adversário o dano é causado ao adversário, caso não seja maior é causado ao jogador.
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}