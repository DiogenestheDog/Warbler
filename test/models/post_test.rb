# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  header      :string
#  body        :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  post_type   :string
#  total_likes :integer          default(0)
#

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
