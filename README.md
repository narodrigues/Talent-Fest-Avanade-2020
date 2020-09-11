# Face Login

## Índice

- [1. Visão do Produto](#1-Visão-do-produto)
- [2. Product Backlog](#2-Product-Backlog)
- [3. Face API](#3-Face-API)
- [4. Site](#4-Site)
- [5. Base de personagens](#5-Base-de-personagens)

---

## 1.  Visão do Produto
Segurança é um problema cada vez maior hoje em dia e garanti-la em meios não digitais pode
ser ainda mais complexo. E o processo de se identificar em eventos ou em pontos de acesso é sempre
um processo muito chato e manual. Além disso, conta normalmente com muitas filas e quase sempre é
assistido por dispositivos ou acessórios para garantir a identificação. Porém, para garantir melhor
experiência para as pessoas é possível fazer sua identificação sem usuários ou senhas e dispositivos
utilizando o reconhecimento facial.

A expectativa com o desenvolvimento da aplicação é criar um site/app de identificação e
cadastro utilizando a api de facial recognition da Microsoft

## 2.  Product Backlog
1 – Cadastro de rostos para reconhecimento
2 – Reconhecimento facial
3 – Site/App com câmera
4 – Reconhecimento facial com foto do site/app
5 – Cadastro de rostos via site/app
6 – Base de personagens
7 – Escolher personagens no cadastro
8 – Exibir personagem no reconhecimento


## 3.  Face API
A api da Microsoft de reconhecimento facial é uma ótima ferramenta para a situação descrita e,
portanto, é imprescindível o uso dela. Segue abaixo mais detalhes de como utilizá-la.

1 - Cadastro
Para cadastrar um rosto é importante primeiro se assegurar que um grupo de pessoas está criado.
Todos os rostos serão comparados dentro deste grupo. Após a criação de um grupo, é possível
cadastrar os rostos daquela pessoa.

2 -Verificação
Para identificar a quem pertence determinado rosto é necessário que a imagem a ser comparada
contra a lista de rostos tenha um faceId associado. Para isso é gerado um faceid para a foto que ao
ser jogada contra o grupo volta os faceids de possíveis candidatos. Para ter o nome da pessoa
associada ao faceid mais uma última chamada é feita com o faceid do candidato no grupo.

## 4.  Site

Para a criação de uma autenticação é necessário o desenvolvimento de um site ou app com câmera para
que a foto seja tirada e enviada ao Face API para a identificação ou cadastro das pessoas.

## 5.  Base de personagens

Com a parte de cadastro e login finalizadas é possível fazer o cruzamento da pessoa com um
personagem de sua escolha. O banco de dados deve conter as seguintes informações:
* Nome
* FaceId
* Nome do personagem
* Foto do personagem

Ao enviar uma foto de uma pessoa para cadastro é necessária a escolha de um personagem
(livre) e na identificação que apareça o nome e foto do personagem de sua escolha.
