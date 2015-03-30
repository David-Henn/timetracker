Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function() {
      // Show newest tasks first
      return Tasks.find({}, {
        sort: {
          createdAt: -1
        }
      });
    }
  });
  Template.body.events({
    "submit .new-task": function(event) {
      // This function is called when the new task form is submitted
      var project = event.target.Project.value;
      var nr = event.target.IssueNr.value;
      var header = event.target.IssueHeader.value;
      var start = event.target.Start.value;
      var end = event.target.End.value;

      Tasks.insert({
        Project: project,
        IssueNr: nr,
        IssueHeader: header,
        Start: start,
        End: end,
        createdAt: new Date() // current time
      });
      // Clear form
      event.target.text.value = "";
      // Prevent default form submit
      return false;
    }
  });
  Template.task.events({
    "click .toggle-checked": function() {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {
          checked: !this.checked
        }
      });
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });
}