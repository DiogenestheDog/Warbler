class RemoveAge < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :age
  end
end