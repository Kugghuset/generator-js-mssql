/*
Updates a <%= name %> to db and selects it.

Note: the password is not updated this way.
*/

-- Update the <%= name %>
UPDATE [dbo].[<%= nameCapitalized %>]
SET
    [description] = @description
  , [dateUpdated] = @GETUTCDATE()

-- Select it
SELECT
    [<%= name %>Id]
  , [description]
  , [dateCreated]
  , [dateUpdated]
FROM [dbo].[<%= nameCapitalized %>]
WHERE [<%= name %>Id] = @<%= name %>Id
