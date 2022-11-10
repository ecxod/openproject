# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See COPYRIGHT and LICENSE files for more details.
#++

module Storages::Peripherals::StorageInteraction::Nextcloud
  class DownloadLinkQuery < StorageQuery
    def initialize(base_uri:, token:, with_refreshed_token:)
      super

      @uri = File.join(base_uri, '/ocs/v2.php/apps/dav/api/v1/direct')
      @token = token
      @with_refreshed_token = with_refreshed_token
    end

    def query(data)
      body = { fileId: data }

      header = {
        'Authorization' => "Bearer #{@token}",
        'OCS-APIRequest' => 'true',
        'Accept' => 'application/json'
      }

      @with_refreshed_token.call do
        # ToDo: not final
        begin
          response = RestClient.post(@uri, body, header)
        rescue RestClient::Unauthorized
          return ServiceResult.failure(result: I18n.t('http.request.failed_authorization'))
        rescue StandardError => e
          return ServiceResult.failure(result: e.message)
        end

        ServiceResult.success(result: response)
      end
    end
  end
end
