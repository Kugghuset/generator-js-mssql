/*
Creates a user to db and selects it.
*/

-- Insert the user
INSERT INTO [dbo].[User] (
    [name]
  , [email]
  , [password]
)
VALUES (
    @name
  , @email
  , @password
)

-- Select it
SELECT TOP 1
    [userId]
  , [name]
  , [email]
  , [dateCreated]
  , [dateUpdated]
  , [isDisabled]
FROM [dbo].[User]
ORDER BY [userId] DESC
