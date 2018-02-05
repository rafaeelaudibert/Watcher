import json
import requests
import sys
import random


apiKey = "RGAPI-7ed3a07d-39a0-4131-8b11-25349f191d2d"
myName = "meloso"
seasonAtual = 9
regions = ['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1', 'ru', 'pbe1']


def requisicao(url):
    solicitacao = requests.get(url)
    
    if solicitacao.status_code == 200:
        return json.loads(solicitacao.content)  # Transforma os dados em formato json
    elif solicitacao.status_code == 429:
        sys.exit('LIMITE EXCEDIDO')
    elif solicitacao.status_code == 503: #Falha no acesso
        return requisicao(url)
    elif solicitacao.status_code == 404:
        return solicitacao.status_code
    else:
        print("Erro: ", solicitacao.status_code)  # Retorna o erro
        sys.exit('ERRO NA OBTENÇÃO')


def retornaMaestria(champId, nick):
    url = "https://br1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" + str(
        retorna_id(nick)) + "/by-champion/" + str(champId) + "?api_key=" + apiKey
    dados_maestria = requisicao(url)
    return dados_maestria['championLevel']  # Retorna o nivel da maestria com esse campeão


def dados_invocador(nick):
    url = "https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + nick + "?api_key=" + apiKey
    dadosInvocador = requisicao(url)
    if dadosInvocador != 0:
        print("Dados do invocador: ")
        print("ID: ", dadosInvocador['id'])
        print("ID da Conta: ", dadosInvocador['accountId'])
        print("Nome: ", dadosInvocador['name'])
        print("Nivel: ", dadosInvocador['summonerLevel'])


def retorna_id(nick):
    url = "https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + nick + "?api_key=" + apiKey
    dadosInvocador = requisicao(url)
    if dadosInvocador != 0:
        return dadosInvocador['id']
    else:
        return 0


def dados_partida_atual(nick):
    ID = str(retorna_id(nick))  # Pega o ID da conta solicitada e transforma ele em string
    url = "https://br1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/" + ID + "?api_key=" + apiKey
    dados_partida_atual = requisicao(url)
    listaChamps = campeoes()
    if dados_partida_atual == 404:
        print("\n\nJogador não está em uma partida ativa")
    elif dados_partida_atual == 429:
        print("\n\nTente novamente mais tarde!")
    elif dados_partida_atual != 0:
        print("\n\nDados da partida atual: ")
        print("\nID da Partida: ", dados_partida_atual['gameId'])
        print("\nModo de Jogo: ", dados_partida_atual['gameMode'])
        print("\nParticipantes: ")
        for participante in dados_partida_atual['participants']:
            id_conta = retorna_id_conta(participante['summonerName'])
            print(participante['summonerName'], " - ", procuraCampeoes(participante['championId'], listaChamps)) # Nome e Champ

            qtdVitorias, qtdJogos = checaQtdeVitorias(participante['championId'], id_conta)
            pVitorias = porcentagemVitorias(qtdVitorias, qtdJogos)
            print(str(pVitorias) + "% de vitoria") # Porcentagem de vitorias
            print("Nível da Maestria: " + str(retornaMaestria(participante['championId'], participante['summonerName']))) # Maestria
            maiorLiga(participante['summonerName']) # Printa a maior liga


def maiorLiga(nick):
    summonerId = str(retorna_id(nick))
    url = "https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + summonerId + "?api_key=" + apiKey
    dados_ligas = requisicao(url)
    info_ligas = []
    maior_liga = ["NULL", "NULL", "NULL", 0]
    if dados_ligas != 0:
        for info in dados_ligas:
            info_ligas.append((info['queueType'], info['tier'], info['rank'], info['leaguePoints']))

        # Faz varias iterações para encontrar a maior liga
        for liga in info_ligas:
            # CHALLENGER
            if liga[1] == "CHALLENGER":
                # Caso já tenha um Challenger la, precisa que os pontos sejam maior
                if maior_liga[3] != 0 and maior_liga[3] < liga[3]:
                    maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                    pass
                elif maior_liga[3] == 0:  # Caso esteja zerado, irá preencher
                    maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                    pass
                pass
            # MESTRE
            elif liga[1] == "MASTER" and maior_liga[1] != "CHALLENGER":  # Caso a maior liga atual não seja challenger
                if maior_liga[3] != 0 and maior_liga[3] < liga[3]:
                    maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                    pass
                elif maior_liga[3] == 0:
                    maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                    pass
                pass
            # DIAMANTE
            elif liga[1] == "DIAMOND" and maior_liga[1] != "CHALLENGER" and maior_liga[1] != 'MASTER':
                if liga[2] == "I":
                    if maior_liga[2] != "I":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:  # Caso contrario, é Diamond I
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "II":
                    if maior_liga[2] != "II":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:  # Caso contrario, é Diamond II
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "III":
                    if maior_liga[2] != "III":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:  # Caso contrario, é Diamond III
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "IV":
                    if maior_liga[2] != "IV":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:  # Caso contrario, é Diamond IV
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                else:
                    if maior_liga[3] < liga[3]:  # Caso contrario, é Diamond V
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                pass
            # PLATINA
            elif liga[1] == "PLATINUM" and maior_liga[1] != 'DIAMOND' and maior_liga[1] != "CHALLENGER" and \
                    maior_liga[1] != 'MASTER':
                if liga[2] == "I":
                    if maior_liga[2] != "I":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "II":
                    if maior_liga[2] != "II":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "III":
                    if maior_liga[2] != "III":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "IV":
                    if maior_liga[2] != "IV":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                else:
                    if maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                pass
            # OURO
            elif liga[1] == "GOLD" and maior_liga[1] != 'PLATINUM' and maior_liga[1] != 'DIAMOND' and \
                    maior_liga[1] != 'DIAMOND' and maior_liga[1] != "CHALLENGER" and maior_liga[1] != 'MASTER':
                if liga[2] == "I":
                    if maior_liga[2] != "I":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "II":
                    if maior_liga[2] != "II":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "III":
                    if maior_liga[2] != "III":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "IV":
                    if maior_liga[2] != "IV":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                else:
                    if maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                pass
            # PRATA
            elif liga[1] == 'SILVER' and maior_liga[1] != 'GOLD' and maior_liga[1] != 'PLATINUM' and \
                    maior_liga[1] != 'DIAMOND' and maior_liga[1] != 'DIAMOND' and maior_liga[1] != "CHALLENGER" and \
                    maior_liga[1] != 'MASTER':
                if liga[2] == "I":
                    if maior_liga[2] != "I":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "II":
                    if maior_liga[2] != "II":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "III":
                    if maior_liga[2] != "III":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "IV":
                    if maior_liga[2] != "IV":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                else:
                    if maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                pass
            # BRONZE
            elif liga[1] == 'BRONZE' and maior_liga[1] != 'SILVER' and maior_liga[1] != 'GOLD' and \
                    maior_liga[1] != 'PLATINUM' and maior_liga[1] != 'DIAMOND' and \
                    maior_liga[1] != 'DIAMOND' and maior_liga[1] != "CHALLENGER" and maior_liga[1] != 'MASTER':
                if liga[2] == "I":
                    if maior_liga[2] != "I":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "II":
                    if maior_liga[2] != "II":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "III":
                    if maior_liga[2] != "III":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                elif liga[2] == "IV":
                    if maior_liga[2] != "IV":
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    elif maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                else:
                    if maior_liga[3] < liga[3]:
                        maior_liga = [liga[0], liga[1], liga[2], liga[3]]
                        pass
                    pass
                pass



    if maior_liga[1] != 'NULL':

        print("Fila: {}\n{} {}\nPontos de liga: {}".format(maior_liga[0], maior_liga[1], maior_liga[2], maior_liga[3]))
        pass
    else:
        print("UNRANKED\nSem pontos de liga")
        pass


def campeoes():
    listaCampeoes = []
    random.shuffle(regions)
    url = "https://" + regions[0] + ".api.riotgames.com/lol/static-data/v3/champions?locale=pt_BR&dataById=false&api_key=" + apiKey
    dados_campeoes = requisicao(url)
    for campeao in dados_campeoes['data']:
        # print("Id: {} - Campeao: {}".format(dados_campeoes['data'][campeao]['id'], dados_campeoes['data'][campeao]['name']))  # Printa informações
        listaCampeoes.append((dados_campeoes['data'][campeao]['id'], dados_campeoes['data'][campeao]['name']))
    return listaCampeoes


def procuraCampeoes(id, listaCampeoes):
    for campeao in listaCampeoes:
        if campeao[0] == id:
            return campeao[1]
    return "Unknown"

def retorna_id_conta(nick):
    url = "https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + str(nick) + "?api_key=" + apiKey
    dadosInvocador = requisicao(url)
    if dadosInvocador != 0:
        return dadosInvocador['accountId']
    else:
        return 0


  # Retorna a lista de ids das partidas jogadas com um dado campeao
def retornaPartidas(idChamp, idConta, beginIndex=0, endIndex=100):
    listaPartidas = []
    qtdPartidas = 0
    url = "https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/" + str(idConta) + "?season=" + str(seasonAtual)\
          + "&beginIndex=" + str(beginIndex) + "&endIndex=" + str(endIndex) + "&champion=" + str(idChamp) + "&api_key=" + apiKey
    dadosPartidas = requisicao(url)
    for partida in dadosPartidas['matches']:
        listaPartidas.append(partida['gameId']) #Pega o ID de todas as partidas
        qtdPartidas += 1
    if dadosPartidas['totalGames']>endIndex:
        listaTemp, qtdTemp = retornaPartidas(idChamp, idConta, beginIndex+100, endIndex+100) #Pega os outros resultados, caso não tenha pego todas partidas possíveis
        listaPartidas += listaTemp
        qtdPartidas +=  qtdTemp
    return listaPartidas, qtdPartidas


  # Checa a qtde de vitorias do jogador com um campeão
def checaQtdeVitorias(id, meuId):
    listaPartidas, qtdeJogos = retornaPartidas(id, str(meuId))
    qtdeVitorias = 0
    iteracoes = 0
    print("Checando porcentagem de vitorias")
    for partida in listaPartidas:
        iteracoes+=1
        print('{}/{}'.format(iteracoes, qtdeJogos))
        qtdeVitorias += checaVitoria(partida, str(meuId))

    return qtdeVitorias, qtdeJogos


def checaVitoria(idPartida, meuId):
    url = "https://br1.api.riotgames.com/lol/match/v3/matches/" + str(idPartida) + "?api_key=" + apiKey
    IDparticipante = None
    dadosPartida = requisicao(url)
    for jogador in dadosPartida['participantIdentities']:
        if int(jogador['player']['currentAccountId']) == int(meuId):
            IDparticipante = jogador['participantId']

    if IDparticipante <= 5:
        if dadosPartida['teams'][0]['win'] == 'Win':
            return 1
        else:
            return 0
    else:
        if dadosPartida['teams'][1]['win'] == 'Win':
            return 1
        else:
            return 0

def porcentagemVitorias(vitorias, qtdeJogos):
    if qtdeJogos>0:
        return 100 * vitorias / qtdeJogos
        pass
    else:
        return 0

myName = input("Digite o nome do jogador: ")

# dados_invocador(myName)
# dados_partida_atual(myName)
maiorLiga(myName)
# campeoes()
# procuraCampeoes(142, campeoes())
# retornaPartidas(142)
# vitorias, qtdeJogos = checaQtdeVitorias(127)
# print("Vitorias: " + str(vitorias))
# print("Porcentagem de vitorias: " + str( 100 * vitorias / float(qtdeJogos)))
# retornaMaestria(127, myName)
