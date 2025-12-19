Feature: Gestión de usuarios en Reqres API
  Como QA Automation
  Quiero manipular los datos de usuarios
  Para verificar el correcto funcionamiento del CRUD

  Background:
    # Given que el servicio de API está disponible en "https://reqres.in"
    Given que el servicio de API está disponible en "http://localhost:3000"

 @create_and_query
  Scenario: Consultar un usuario creado por ID
    When creo un usuario con nombre "Morpheus" y trabajo "Leader"
    And consulto el usuario por su ID
  # Al consultar (GET), el código es 200, no 201
    Then la respuesta debe tener el código de estado 200
    And los datos del usuario consultado deben coincidir con "Morpheus" y "Leader"

  @update
  Scenario: Actualizar datos de usuario y verificar
    Given que existe un usuario creado con nombre "Neo" y trabajo "The One"
    When actualizo el usuario con nuevo nombre "Neo Updated" y trabajo "Matrix Rescuer"
    Then la respuesta de actualización debe ser 200
    And la respuesta debe contener los datos actualizados "Neo Updated" y "Matrix Rescuer"

  @delete
  Scenario: Eliminar un usuario y verificar su ausencia
    Given que existe un usuario con ID 2 para eliminar
    When elimino al usuario
    Then el código de respuesta de eliminación debe ser 200
    And al consultar la lista de usuarios, el usuario eliminado no debe existir