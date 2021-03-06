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

class Post < ApplicationRecord
    validates :post_type, :user_id, presence: true
    validates :post_type, inclusion: { in: %w(text chat quote photo audio video) }
        # message: "%{value} is not a valid post-type" }

    has_one_attached :image

    belongs_to :user
    has_many :likes
end
